import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    ...prefix("data-structures", [layout('layout.tsx', [index("routes/home.tsx"), route('binary-search-tree', 'routes/bst.tsx')])])
] satisfies RouteConfig;
