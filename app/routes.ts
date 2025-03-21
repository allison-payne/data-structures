import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [layout('layout.tsx', [index("routes/home.tsx"), route('binary-search-tree', 'routes/bst.tsx')])] satisfies RouteConfig;
