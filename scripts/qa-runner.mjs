const BASE_URL = process.env.TEST_URL || "https://wolrdpulse.app";

async function runQATests() {
  console.log(`\n======================================================`);
  console.log(`🚀 STARTING COMPREHENSIVE QA TEST SUITE`);
  console.log(`🎯 Target URL: ${BASE_URL}`);
  console.log(`⏱  Timestamp: ${new Date().toISOString()}`);
  console.log(`======================================================\n`);

  const results = [];

  async function test(name, category, fn) {
    const start = Date.now();
    try {
      await fn();
      const duration = Date.now() - start;
      results.push({ name, category, status: "PASS", duration });
      console.log(`  ✅ [PASS] (${duration}ms) - ${name}`);
    } catch (err) {
      const duration = Date.now() - start;
      results.push({ name, category, status: "FAIL", error: err.message, duration });
      console.error(`  ❌ [FAIL] (${duration}ms) - ${name}`);
      console.error(`     └─ Error: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // 1. PAGE & ROUTE INTEGRITY TESTS
  // ----------------------------------------------------
  console.log(`\n📄 [CATEGORY: Page & Route Integrity]`);

  await test("Homepage (/) returns 200 & HTML", "Pages", async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes("WolrdPulse")) throw new Error("Missing brand 'WolrdPulse' in HTML");
    if (!html.includes("application/ld+json")) throw new Error("Missing JSON-LD structured data");
  });

  await test("Features Page (/features) returns 200 & HTML", "Pages", async () => {
    const res = await fetch(`${BASE_URL}/features`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes("Telemetry Features")) throw new Error("Missing header in features page");
  });

  await test("Developer Page (/developer) returns 200 & HTML", "Pages", async () => {
    const res = await fetch(`${BASE_URL}/developer`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes("Anas Rhimi")) throw new Error("Missing developer name");
    if (!html.includes("github.com/sponsors/Mealiclay01")) throw new Error("Missing GitHub Sponsors link");
  });

  await test("Privacy Policy (/privacy) returns 200 & HTML", "Pages", async () => {
    const res = await fetch(`${BASE_URL}/privacy`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes("Privacy Policy")) throw new Error("Missing Privacy Policy text");
  });

  await test("Terms of Service (/terms) returns 200 & HTML", "Pages", async () => {
    const res = await fetch(`${BASE_URL}/terms`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes("Terms of Service")) throw new Error("Missing Terms text");
  });

  // ----------------------------------------------------
  // 2. BACKEND API ENDPOINT TESTS
  // ----------------------------------------------------
  console.log(`\n⚡ [CATEGORY: Backend API & Microservices]`);

  await test("GET /api/status returns valid cloud health payload", "API", async () => {
    const res = await fetch(`${BASE_URL}/api/status`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.services) || data.services.length === 0) {
      throw new Error("Invalid services array in status payload");
    }
    const aws = data.services.find(s => s.id === "aws");
    if (!aws || !aws.status) throw new Error("Missing AWS status in payload");
  });

  await test("GET /api/ssl inspects TLS certificates correctly", "API", async () => {
    const res = await fetch(`${BASE_URL}/api/ssl?domain=github.com`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(`API returned error: ${data.error}`);
    if (typeof data.daysRemaining !== "number" || data.daysRemaining <= 0) {
      throw new Error("Invalid daysRemaining calculation");
    }
    if (!data.issuer) throw new Error("Missing SSL issuer details");
  });

  await test("GET /api/ssl gracefully handles invalid domains", "API", async () => {
    const res = await fetch(`${BASE_URL}/api/ssl?domain=invalid-domain-that-does-not-exist-xyz123.com`);
    const data = await res.json();
    if (!data.error) throw new Error("Expected error message for non-existent domain");
  });

  await test("GET /api/dns queries Cloudflare DoH (A records)", "API", async () => {
    const res = await fetch(`${BASE_URL}/api/dns?domain=vercel.com&type=A`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(`API returned error: ${data.error}`);
    if (!Array.isArray(data.answers) || data.answers.length === 0) {
      throw new Error("Expected at least one A record for vercel.com");
    }
  });

  await test("POST /api/ping executes synthetic edge probes", "API", async () => {
    const res = await fetch(`${BASE_URL}/api/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://api.github.com" })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(`API returned error: ${data.error}`);
    if (typeof data.statusCode !== "number" || data.statusCode < 200) {
      throw new Error(`Unexpected status code: ${data.statusCode}`);
    }
    if (typeof data.totalTimeMs !== "number" || data.totalTimeMs <= 0) {
      throw new Error("Invalid latency calculation");
    }
  });

  await test("GET /api/pulse retrieves GitHub releases and trending repos", "API", async () => {
    const res = await fetch(`${BASE_URL}/api/pulse`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.releases) || data.releases.length === 0) {
      throw new Error("Missing framework releases list");
    }
    if (!Array.isArray(data.trending) || data.trending.length === 0) {
      throw new Error("Missing trending repositories list");
    }
  });

  // ----------------------------------------------------
  // 3. MCP PROTOCOL & SSE PROTOCOL INTEGRITY
  // ----------------------------------------------------
  console.log(`\n🤖 [CATEGORY: Model Context Protocol (MCP) & SSE Stream]`);

  await test("GET /sse returns event-stream headers", "MCP", async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`${BASE_URL}/sse`, {
        headers: { Accept: "text/event-stream" },
        signal: controller.signal
      });
      clearTimeout(timeout);
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("text/event-stream")) {
        throw new Error(`Expected text/event-stream, got '${contentType}'`);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // SSE streams stay open, so aborting after reading headers is expected
        return;
      }
      throw err;
    }
  });

  await test("POST /api/mcp handles JSON-RPC 2.0 tools/list request", "MCP", async () => {
    const res = await fetch(`${BASE_URL}/api/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {}
      })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const json = await res.json();
    if (!json.result || !Array.isArray(json.result.tools)) {
      throw new Error("Expected JSON-RPC result containing tools array");
    }
    const toolNames = json.result.tools.map(t => t.name);
    if (!toolNames.includes("get_cloud_status")) throw new Error("Missing get_cloud_status in MCP tools list");
    if (!toolNames.includes("inspect_ssl")) throw new Error("Missing inspect_ssl in MCP tools list");
    if (!toolNames.includes("query_dns")) throw new Error("Missing query_dns in MCP tools list");
    if (!toolNames.includes("ping_endpoint")) throw new Error("Missing ping_endpoint in MCP tools list");
  });

  // ----------------------------------------------------
  // 4. SUMMARY MATRIX
  // ----------------------------------------------------
  console.log(`\n======================================================`);
  console.log(`📊 QA TEST SUITE SUMMARY MATRIX`);
  console.log(`======================================================`);

  const passed = results.filter(r => r.status === "PASS").length;
  const failed = results.filter(r => r.status === "FAIL").length;
  const total = results.length;
  const totalDuration = results.reduce((acc, r) => acc + r.duration, 0);

  console.log(`Total Tests Run : ${total}`);
  console.log(`Passed          : ${passed} ✅`);
  console.log(`Failed          : ${failed} ${failed > 0 ? "❌" : ""}`);
  console.log(`Total Execution : ${totalDuration}ms`);
  console.log(`Success Rate    : ${((passed / total) * 100).toFixed(1)}%\n`);

  return { results, passed, failed, total, totalDuration };
}

runQATests();
