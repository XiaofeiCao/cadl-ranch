import { json, MockRequest, passOnSuccess, ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const validLroResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.OperationTemplates/lroResources/lro`,
  name: "top",
  type: "Azure.ResourceManager.Resources/lroResources",
  location: "eastus",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: "2024-10-04T00:56:07.442Z",
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: "2024-10-04T00:56:07.442Z",
    lastModifiedByType: "User",
  },
};
let createOrReplacePollCount = 0;
let deletePollCount = 0;

// lro resource
Scenarios.Azure_ResourceManager_Resources_Lro_createOrReplace = passOnSuccess([
  {
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.OperationTemplates/lroResources/:lroResourceName",
    method: "put",
    request: {
      params: {
        "subscriptionId": SUBSCRIPTION_ID_EXPECTED,
        "resourceGroup": RESOURCE_GROUP_EXPECTED,
        "lroResourceName": "lro",
        "api-version": "2023-12-01-preview",
      },
      body: {
        location: "eastus",
        properties: {
          description: "valid",
        },
      },
    },
    response: {
      status: 201,
      headers: {
        "Azure-AsyncOperation": `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/operations/create_or_replace`,
      },
      body: json(validLroResource),
    },
    handler: (req: MockRequest) => {
      createOrReplacePollCount = 0;
      return {
        status: 201,
        headers: {
          "Azure-AsyncOperation": `${req.baseUrl}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/operations/create_or_replace`,
        },
        body: json({
          ...validLroResource,
          properties: {
            description: "valid",
            provisioningState: "InProgress",
          },
        }),
      };
    },
    kind: "MockApiDefinition",
  },
  {
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/operations/create_or_replace",
    method: "get",
    request: {
      params: {
        "subscriptionId": SUBSCRIPTION_ID_EXPECTED,
        "resourceGroup": RESOURCE_GROUP_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({ id: "create_or_replace", status: "InProgress" }),
    },
    handler: (req: MockRequest) => {
      const response =
        createOrReplacePollCount > 0
          ? { id: "create_or_replace", status: "Succeeded" }
          : { id: "create_or_replace", status: "InProgress" };
      const statusCode = createOrReplacePollCount > 0 ? 200 : 202;
      createOrReplacePollCount += 1;
      return {
        status: statusCode,
        body: json(response),
      };
    },
    kind: "MockApiDefinition",
  },
  {
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.OperationTemplates/lroResources/:lroResourceName",
    method: "get",
    request: {
      params: {
        "subscriptionId": SUBSCRIPTION_ID_EXPECTED,
        "resourceGroup": RESOURCE_GROUP_EXPECTED,
        "lroResourceName": "lro",
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json(validLroResource),
    },
    kind: "MockApiDefinition",
  },
]);

Scenarios.Azure_ResourceManager_Resources_Lro_delete = passOnSuccess([
  {
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.OperationTemplates/lroResources/:lroResourceName",
    method: "delete",
    request: {
      params: {
        "subscriptionId": SUBSCRIPTION_ID_EXPECTED,
        "resourceGroup": RESOURCE_GROUP_EXPECTED,
        "lroResourceName": "lro",
        "api-version": "2023-12-01-preview",
      },
      body: {
        location: "eastus",
        properties: {
          description: "valid",
        },
      },
    },
    response: {
      status: 202,
      headers: {
        "Location": `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/operations/delete`,
        "Azure-AsyncOperation": `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/operations/delete`,
      },
    },
    handler: (req: MockRequest) => {
      deletePollCount = 0;
      return {
        status: 202,
        headers: {
          "Location": `${req.baseUrl}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/operations/delete`,
          "Azure-AsyncOperation": `${req.baseUrl}/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/operations/delete`,
        },
        body: json({ id: "delete", status: "InProgress" }),
      };
    },
    kind: "MockApiDefinition",
  },
  {
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/operations/delete",
    method: "get",
    request: {
      params: {
        "subscriptionId": SUBSCRIPTION_ID_EXPECTED,
        "resourceGroup": RESOURCE_GROUP_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 202,
    },
    handler: (req: MockRequest) => {
      const response =
        deletePollCount > 0 ? { status: 204 } : { status: 202, body: json({ id: "delete", status: "InProgress" }) };
      deletePollCount += 1;

      return response;
    },
    kind: "MockApiDefinition",
  },
]);
