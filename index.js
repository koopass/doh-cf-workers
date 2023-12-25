// index.js
var doh = "https://dns.cloudflare.com/dns-query";
var dohjson = "https://dns.cloudflare.com/dns-query";
var contype = "application/dns-message";
var jstontype = "application/dns-json";
var r404 = new Response(null, { status: 404 });
var workspace_default = {
  async fetch(r, env, ctx) {
    return handleRequest(r);
  }
};
async function handleRequest(request) {
  let res = r404;
  const { method, headers, url } = request;
  const searchParams = new URL(url).searchParams;
  if (method == "GET" && searchParams.has("dns")) {
    res = fetch(doh + "?dns=" + searchParams.get("dns"), {
      method: "GET",
      headers: {
        "Accept": contype
      }
    });
  } else if (method === "POST" && headers.get("content-type") === contype) {
    const rostream = request.body;
    res = fetch(doh, {
      method: "POST",
      headers: {
        "Accept": contype,
        "Content-Type": contype
      },
      body: rostream
    });
  } else if (method === "GET" && headers.get("Accept") === jstontype) {
    const search = new URL(url).search;
    res = fetch(dohjson + search, {
      method: "GET",
      headers: {
        "Accept": jstontype
      }
    });
  }
  return res;
}
export {
  workspace_default as default
};
//# sourceMappingURL=index.js.map
