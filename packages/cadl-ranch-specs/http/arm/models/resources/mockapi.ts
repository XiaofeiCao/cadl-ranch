import { passOnSuccess, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";
import { ResourceRepository } from "../../repository.js";

export const Scenarios: Record<string, ScenarioMockApi> = {};

Scenarios.Arm_Models_Resources_TopLevelArmResources_get = passOnSuccess([
  createGetApi(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/:provider/topLevelArmResources/:topLevelResourceName",
  ),
  createPutApi(
    "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/:provider/topLevelArmResources/:topLevelResourceName",
  ),
]);

const repository = new ResourceRepository();

function createGetApi(url: string): MockApi {
  return mockapi.get(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    const topLevelArmResource = repository.get(req.originalRequest.url);
    if (!Boolean(topLevelArmResource)) {
      return {
        status: 404,
      };
    } else {
      return {
        status: 200,
        body: json(topLevelArmResource),
      };
    }
  });
}

function createPutApi(url: string): MockApi {
  return mockapi.put(url, (req) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    req.expect.bodyNotEmpty();
    return {
      status: 200,
      body: json(repository.put(req.originalRequest.url, req.params.topLevelResourceName, req.body)),
    };
  });
}
