declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_ADMIN_SERVICE_URL: string
    NEXT_PUBLIC_ADMIN_PRODUCT_URL: string
    NEXT_PUBLIC_ADMIN_CUSTOMER_URL: string
    NEXT_PUBLIC_ADMIN_GUIDE_SERVICE_URL: string
    NEXT_PUBLIC_ADMIN_GATEWAY_URL: string

    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string

    AUTH_CLIENT_ID: string
    AUTH_SECRET: string
    AUTH_BASE_URL: string
    AUTH_REALM: string
  }
}
