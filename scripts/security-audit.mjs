const BASE_URL = process.env.TEST_URL || "http://127.0.0.1:3008";

async function runSecurityAudit() {
  console.log(`\n======================================================`);
  console.log(`🔒 STARTING AUTOMATED SECURITY & DEFENSE AUDIT`);
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
      console.log(`  🛡️ [PASS] (${duration}ms) - ${name}`);
    } catch (err) {
      const duration = Date.now() - start;
      results.push({ name, category, status: "FAIL", error: err.message, duration });
      console.error(`  ⚠️ [FAIL] (${duration}ms) - ${name}`);
      console.error(`     └─ Reason: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // 1. SSRF & PRIVATE NETWORK ISOLATION TESTS
  // ----------------------------------------------------
  console.log(`\n🛡️ [CATEGORY: SSRF & Loopback Protection]`);

  await test("Blocks localhost probe (127.0.0.1)", "SSRF", async () => {
    const res = await fetch(`${BASE_URL}/api/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "http://127.0.0.1:8080" }),
    });
    const data = await res.json();
    if (data.statusCode === 200) {
      throw new Error("Server allowed ping to 127.0.0.1");
    }
    if (!data.error && !data.statusText?.includes("restricted") && data.statusCode !== 0) {
      throw new Error("Expected SSRF restriction or blocked status");
    }
  });

  await test("Blocks Cloud Metadata probe (169.254.169.254)", "SSRF", async () => {
    const res = await fetch(`${BASE_URL}/api/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "http://169.254.169.254/latest/meta-data/" }),
    });
    const data = await res.json();
    if (data.statusCode === 200) {
      throw new Error("Server allowed access to cloud metadata endpoint");
    }
  });

  await test("Blocks Private Subnet probe (10.0.0.1)", "SSRF", async () => {
    const res = await fetch(`${BASE_URL}/api/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "http://10.0.0.1/admin" }),
    });
    const data = await res.json();
    if (data.statusCode === 200) {
      throw new Error("Server allowed ping to private RFC 1918 subnet");
    }
  });

  // ----------------------------------------------------
  // 2. HTTP SECURITY HEADERS AUDIT
  // ----------------------------------------------------
  console.log(`\n📋 [CATEGORY: HTTP Security Headers]`);

  await test("Verifies X-Content-Type-Options: nosniff", "Headers", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const header = res.headers.get("x-content-type-options");
    if (header !== "nosniff") {
      throw new Error(`Expected 'nosniff', got '${header}'`);
    }
  });

  await test("Verifies X-Frame-Options (Clickjacking defense)", "Headers", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const header = res.headers.get("x-frame-options");
    if (!header || !header.includes("SAMEORIGIN")) {
      throw new Error(`Expected SAMEORIGIN, got '${header}'`);
    }
  });

  await test("Verifies Referrer-Policy", "Headers", async () => {
    const res = await fetch(`${BASE_URL}/`);
    const header = res.headers.get("referrer-policy");
    if (!header || !header.includes("strict-origin-when-cross-origin")) {
      throw new Error(`Expected strict-origin-when-cross-origin, got '${header}'`);
    }
  });

  // ----------------------------------------------------
  // 3. INPUT VALIDATION & PROTOCOL RESILIENCE
  // ----------------------------------------------------
  console.log(`\n🧩 [CATEGORY: Protocol Fuzzing & Malformed Inputs]`);

  await test("Rejects malformed JSON-RPC payloads in /api/mcp", "MCP", async () => {
    const res = await fetch(`${BASE_URL}/api/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invalid_syntax: true }),
    });
    const data = await res.json();
    if (!data.error && data.status !== 400) {
      throw new Error("Expected JSON-RPC error response for invalid RPC structure");
    }
  });

  await test("Handles nonexistent MCP tool invocations safely", "MCP", async () => {
    const res = await fetch(`${BASE_URL}/api/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 99,
        method: "tools/call",
        params: { name: "non_existent_tool_xyz" },
      }),
    });
    const data = await res.json();
    if (!data.error && !data.result?.isError) {
      throw new Error("Expected tool not found error");
    }
  });

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log(`\n======================================================`);
  console.log(`📊 SECURITY AUDIT SUMMARY MATRIX`);
  console.log(`======================================================`);

  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  const total = results.length;
  const totalDuration = results.reduce((acc, r) => acc + r.duration, 0);

  console.log(`Total Security Checks : ${total}`);
  console.log(`Passed                : ${passed} 🛡️`);
  console.log(`Failed                : ${failed} ${failed > 0 ? "⚠️" : ""}`);
  console.log(`Execution Time        : ${totalDuration}ms`);
  console.log(`Security Health Score : ${((passed / total) * 100).toFixed(1)}%\n`);

  return { passed, failed, total };
}

runSecurityAudit();
