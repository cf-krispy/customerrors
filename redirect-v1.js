
export default {
    async fetch(request) {
      const response = await fetch(request);
  
      if (response.status >= 500 && !response.redirected) {
        const url = new URL(request.url);
        url.hostname = "customerrors.pages.dev";
        url.pathname = "/error";
  
        // Add diagnostic information explicitly as query parameters
        url.searchParams.set("ray", request.headers.get("cf-ray") || "");
        url.searchParams.set("ip", request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "");
        url.searchParams.set("colo", request.cf?.colo || "");
        url.searchParams.set("err", response.status);
  
        // IMPORTANT: Return a redirect to the client browser
        return Response.redirect(url.toString(), 302);
      }
  
      // No error; return the original response
      return response;
    },
  };