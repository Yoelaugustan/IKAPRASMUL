# ---- Build stage ----------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution-wide MSBuild config first (TargetFramework + central package
# versions) so `dotnet restore` resolves correctly.
COPY Directory.Build.props Directory.Packages.props ./

# Copy each project file, then restore. Doing this before copying the full
# source lets Docker cache the restore layer until a .csproj actually changes.
COPY IkaPrasmul.Commons/IkaPrasmul.Commons.csproj           IkaPrasmul.Commons/
COPY IkaPrasmul.Contracts/IkaPrasmul.Contracts.csproj       IkaPrasmul.Contracts/
COPY IkaPrasmul.Entities/IkaPrasmul.Entities.csproj         IkaPrasmul.Entities/
COPY IkaPrasmul.Infrastructure/IkaPrasmul.Infrastructure.csproj IkaPrasmul.Infrastructure/
COPY IkaPrasmul.WebAPI/IkaPrasmul.WebAPI.csproj             IkaPrasmul.WebAPI/
RUN dotnet restore IkaPrasmul.WebAPI/IkaPrasmul.WebAPI.csproj

# Copy the rest of the source and publish a release build.
COPY . .
RUN dotnet publish IkaPrasmul.WebAPI/IkaPrasmul.WebAPI.csproj \
    -c Release -o /app/publish --no-restore /p:UseAppHost=false

# ---- Runtime stage --------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Kestrel listens on 8080 (the .NET 8 image default). nginx on the host
# proxies to this port (published in docker-compose).
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish ./

ENTRYPOINT ["dotnet", "IkaPrasmul.WebAPI.dll"]
