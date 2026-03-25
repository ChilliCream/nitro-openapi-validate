# Nitro OpenAPI Validate

A GitHub Action that validates OpenAPI documents against the Nitro registry.

## Usage

```yaml
- uses: ChilliCream/nitro-openapi-validate@v16
  with:
    stage: <stage>
    openapi-collection-id: <openapi-collection-id>
    api-key: <api-key>
    patterns:
      - ./endpoints/**/*.graphql
      - ./models/Person.graphql
```

## Inputs

| Name                    | Required | Description                                        |
| ----------------------- | -------- | -------------------------------------------------- |
| `stage`                 | Yes      | The name of the stage                              |
| `openapi-collection-id` | Yes      | The ID of the OpenAPI collection                   |
| `api-key`               | Yes      | API key for authentication                         |
| `patterns`              | Yes      | Glob patterns for selecting OpenAPI document files |
| `cloud-url`             | No       | The URL of the Nitro registry                      |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
