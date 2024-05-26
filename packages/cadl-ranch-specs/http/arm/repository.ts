export class ResourceRepository {
  private resources: Record<string, Resource> = {};

  public get(resourceID: string) {
    return this.resources.resourceID;
  }

  public put(resourceID: string, resourceName: string, resource: Resource): Resource {
    resource.id = resourceID;
    resource.type = "dummy";
    resource.name = resourceName;
    resource.systemData = {
      createdBy: "AzureSDK",
      createdByType: "User",
      createdAt: new Date(),
      lastModifiedBy: "AzureSDK",
      lastModifiedAt: new Date(),
      lastModifiedByType: "User",
    };
    resource.properties = {
      ...resource.properties,
      provisioningState: "Succeeded",
    };
    this.resources.resourceID = resource;
    return resource;
  }
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  systemData: SystemData;
  properties?: {};
}

export interface SystemData {
  createdBy: string;
  createdByType: string;
  createdAt: Date;
  lastModifiedBy: string;
  lastModifiedByType: string;
  lastModifiedAt: Date;
}
