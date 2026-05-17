# 🏛️ Coding & Architecture Naming Conventions

This document outlines the architectural standards and naming conventions for our TypeScript codebase. Following these rules ensures the system remains explicit, scalable, strongly typed, and self-documenting as it grows.

---

# 1. High-Level Architecture Flow

Data flows through explicit boundaries. As data crosses a layer, its naming structure updates to accurately reflect its current protocol state (e.g., transport vs. domain logic).

```text
[Client Request]
       │
       ▼
1. Validation Layer ──► Suffix: *Schema
                        Example: CreateShopSchema
       │
       ▼
2. Controller Layer ──► Input:  *Request
                        Output: *Response
       │
       ▼
3. Service Layer    ──► Input:  *Input
                        Output: *Result
       │
       ▼
[Database / Entity Layer]
```

---

# 2. Naming Conventions Matrix

| Layer                | Input Nomenclature        | Output Nomenclature        | Example                                    |
| -------------------- | ------------------------- | -------------------------- | ------------------------------------------ |
| Validation           | `[Action][Entity]Schema`  | Type Inference             | `CreateShopSchema`                         |
| Controller (Network) | `[Action][Entity]Request` | `[Action][Entity]Response` | `CreateShopRequest` / `CreateShopResponse` |
| Service (Domain)     | `[Action][Entity]Input`   | `[Action][Entity]Result`   | `CreateShopInput` / `CreateShopResult`     |

---

## ⚠️ Why "Result" instead of "Response" in Services?

`Response` typically implies a network or transport boundary (HTTP, GraphQL, RPC, etc.).

Services operate purely within domain and business logic layers, making `Result` a more protocol-agnostic and semantically accurate naming convention.

---

# 3. General Utility & Token Typing Conventions

When writing lower-level utility functions (token generation, cryptography helpers, etc.), always strongly type returned objects using explicit interfaces or type aliases instead of inline anonymous structures or tuples.

This improves:

- readability
- reusability
- discoverability
- long-term maintainability

## Example

```ts
// ✅ GOOD

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export const createTokenPair = async (
  payload: unknown,
  publicKey: string,
  privateKey: string,
): Promise<TokenPair> => {
  return {
    accessToken: "...",
    refreshToken: "...",
  };
};
```

---

# 4. Layer-by-Layer Rules

# A. Validation Layer

Validation intercepts malformed data before it reaches controllers or services.

## Rule A1

Suffix validation schemas strictly with:

```text
Schema
```

## Rule A2

Use runtime validation libraries (e.g., Zod) to derive TypeScript types via inference instead of manually duplicating interfaces.

## Example

```ts
import { z } from "zod";

// ✅ GOOD

export const CreateShopSchema = z.object({
  body: z.object({
    shopName: z.string().min(3).max(50),
  }),
});

// ✅ GOOD

export type CreateShopRequest = z.infer<typeof CreateShopSchema>;
```

---

# B. Controller Layer

Controllers translate:

- network payloads
- authentication context
- transport-level metadata

into internal application/service inputs.

Controllers should remain extremely thin.

## Rule B1

Inputs should use:

```text
Request
```

or

```text
Payload
Body
```

suffixes.

## Rule B2

Outputs should use:

```text
Response
```

suffixes.

## Rule B3

Controllers should:

1. validate/deserialize request data
2. map request data into service input
3. invoke service logic
4. serialize service result into response

Controllers should NOT contain business logic.

## Example

```ts
// controllers/shop.controller.ts
import { ShopService } from "../services/shop.service";

import { CreateShopRequest, CreateShopResponse } from "./shop.types";

export async function createShopController(
  req: CreateShopRequest,
): Promise<CreateShopResponse> {
  // 1. Map Request → Service Input

  const serviceInput = {
    name: req.body.shopName,
    ownerId: req.user.id,
  };

  // 2. Execute business logic

  const result = await ShopService.createShop(serviceInput);

  // 3. Map Service Result → Response

  return {
    success: true,
    data: {
      id: result.shop.id,
      name: result.shop.name,
    },
  };
}
```

---

# C. Service Layer

The Service Layer contains pure business/domain logic.

It must remain independent from:

- HTTP
- Express
- GraphQL
- CRON jobs
- queues
- transport protocols

Services should be reusable across multiple execution environments.

---

## Rule C1 — Wrap Inputs into Dedicated Input Objects

Do NOT pass multiple loose arguments.

### ❌ BAD

```ts
async function createShop(name: string, ownerId: string);
```

### ✅ GOOD

```ts
type CreateShopInput = {
  name: string;
  ownerId: string;
};
```

This prevents breaking changes when adding new fields later.

---

## Rule C2 — Always Explicitly Type Results

Even if a service currently returns a single entity, wrap the return value inside a dedicated `Result` type.

This allows future expansion without changing consumer contracts.

### ❌ BAD

```ts
async function createShop(input: CreateShopInput): Promise<Shop>;
```

### ✅ GOOD

```ts
export type CreateShopResult = {
  shop: Shop;
  requiresBillingSetup: boolean;
  onboardingStep: number;
};

async function createShop(input: CreateShopInput): Promise<CreateShopResult> {
  // business logic...
}
```

---

# 5. Location & Scoping Conventions

Keep:

- `*Input`
- `*Result`
- `*Request`
- `*Response`
- `*Schema`

close to their implementation modules.

## Recommended

```text
shop/
  shop.controller.ts
  shop.service.ts
  shop.schema.ts
  shop.types.ts
```

or colocate small types directly beside implementation files.

---

## Export Types Explicitly

Always export public types so upper layers can strongly type integration boundaries.

```ts
export type CreateShopInput = {};
export type CreateShopResult = {};
```

---

# 6. Core Principles

- Prefer explicitness over magic.
- Prefer composition over inheritance.
- Keep transport concerns outside services.
- Keep controllers thin.
- Keep services deterministic.
- Use runtime validation at boundaries.
- Keep type names semantically accurate to their layer responsibilities.

---

# 7. Recommended Naming Summary

| Concern              | Convention    |
| -------------------- | ------------- |
| Validation           | `*Schema`     |
| Controller Input     | `*Request`    |
| Controller Output    | `*Response`   |
| Service Input        | `*Input`      |
| Service Output       | `*Result`     |
| Sanitization         | `sanitize*`   |
| Serialization        | `to*Response` |
| Utility Pair Objects | `*Pair`       |

---

# 8. Example End-to-End Flow

```text
CreateShopSchema
        │
        ▼
CreateShopRequest
        │
        ▼
CreateShopInput
        │
        ▼
CreateShopResult
        │
        ▼
CreateShopResponse
```
