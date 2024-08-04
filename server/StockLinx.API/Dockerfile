FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5007
EXPOSE 5008

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["StockLinx.API/StockLinx.API.csproj", "StockLinx.API/"]
COPY ["StockLinx.Service/StockLinx.Service.csproj", "StockLinx.Service/"]
COPY ["StockLinx.Repository/StockLinx.Repository.csproj", "StockLinx.Repository/"]
COPY ["StockLinx.Core/StockLinx.Core.csproj", "StockLinx.Core/"]
RUN dotnet restore "./StockLinx.API/StockLinx.API.csproj"
COPY . .
WORKDIR "/src/StockLinx.API"
RUN dotnet build "./StockLinx.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./StockLinx.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StockLinx.API.dll"]