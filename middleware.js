import { routeProtector} from "./lib/allMiddleware";
export async function middleware(request) {
    await routeProtector(request);
    
};