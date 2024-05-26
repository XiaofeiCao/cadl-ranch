import "@typespec/http";
import "@typespec/rest";
import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";

using TypeSpec.Http;
using TypeSpec.Rest;
using Azure.Core;
using Azure.ResourceManager;
using TypeSpec.OpenAPI;

namespace Arm.Models.Resources;

@resource("topLevelArmResources")
model TopLevelArmResource is TrackedResource<TopLevelArmResourceProperties> {
  @key("topLevelArmResourceName")
  @path
  @segment("topLevelArmResources")
  @doc("arm resource name for path")
  @pattern("^[A-Za-z0-9]([A-Za-z0-9-_.]{0,62}[A-Za-z0-9])?$")
  name: string;
}

@doc("Top Level Arm Resource Properties.")
model TopLevelArmResourceProperties {
  @visibility("read")
  @doc("The status of the last operation.")
  provisioningState?: ProvisioningState;

  @doc("The description of the resource.")
  description?: string;
}

@armResourceOperations
interface TopLevelArmResources {
  @scenario
  @scenarioDoc("""
  Resource Get operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <any string>,
    "systemData": <any object>
  }
  ```
  """)
  get is ArmResourceRead<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PUT operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  createOrReplace is ArmResourceCreateOrReplaceAsync<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  update is ArmResourcePatchAsync<TopLevelArmResource, TopLevelArmResourceProperties>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  delete is ArmResourceDeleteWithoutOkAsync<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  listByResourceGroup is ArmResourceListByParent<TopLevelArmResource>;

  @scenario
  @scenarioDoc("""
  Resource PATCH operation.
  Expected resourceId: /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Arm.Models.Resources/topLevelArmResources/topLevelResource
  Expected query parameter: api-version=2023-12-01-preview
  Expected request body:
  ```json
  {
    "description": <any string>
  }
  ```
  Expected response body:
  ```json
  {
    "id": <any string>,
    "name": <any string>,
    "type": <any string>,
    "description": <given string in request body>,
    "systemData": <any object>
  }
  ```
  """)
  listBySubscription is ArmListBySubscription<TopLevelArmResource>;
}
