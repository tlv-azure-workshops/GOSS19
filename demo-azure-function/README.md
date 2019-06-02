```
func init . --docker #choose node and javascript
```


```
func new #choose storage queue trigger
```

function.json
-------------
```
{
  "bindings": [
    {
      "name": "myQueueItem",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "js-queue-items",
      "connection": "AzureWebJobsStorage"
    },
    {
      "type": "signalR",
      "name": "signalRMessages",
      "hubName": "chat",
      "direction": "out"
    }
  ]
}
```

index.js
--------
```
module.exports = async function (context, myQueueItem) {

    context.log("firework sent")
      context.bindings.signalRMessages = [{
        "target": "newMessage",
        "arguments": [ "" ]
      }];
      context.done();
};
```

local.setting.json
------------------
```
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "{AzureWebJobsStorageConnectionString}",
    "AzureSignalRConnectionString": "{AzureSignalRConnectionString}"
  }
}
```

extensions.csproj
-----------------
```
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
	<WarningsAsErrors></WarningsAsErrors>
	<DefaultItemExcludes>**</DefaultItemExcludes>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.Azure.WebJobs.Extensions.SignalRService" Version="1.0.0" />
    <PackageReference Include="Microsoft.Azure.WebJobs.Extensions.Storage" Version="3.0.4" />
    <PackageReference Include="Microsoft.Azure.WebJobs.Script.ExtensionsMetadataGenerator" Version="1.1.0" />
  </ItemGroup>
</Project>
```

