// app/api/employees/test/route.js
export async function GET(req) {
  return new Response(JSON.stringify({ 
    route: "employees/test",
    working: true 
  }), {
    status: 200
  });
}