--DROP TABLE [EXCELP&D].[dbo].[LotOptionToPackage];
--DROP TABLE [EXCELP&D].[dbo].[PackageToProject];
--DROP TABLE [EXCELP&D].[dbo].[Packages];

CREATE TABLE [EXCELP&D].[dbo].[Packages] (
	packageID int IDENTITY(1,1) NOT NULL UNIQUE,
	builderIDFK int NOT NULL,
	packageName VARCHAR(100) UNIQUE,
	FOREIGN KEY (builderIDFK) REFERENCES [EXCELP&D].[dbo].[Customers]([Customer ID]),
	PRIMARY KEY (packageID, builderIDFK)
)

CREATE TABLE [EXCELP&D].[dbo].[LotOptionToPackage] (
	lotOptionIDFK int NOT NULL,
	packageIDFK int NOT NULL,
	FOREIGN KEY (lotOptionIDFK) REFERENCES [EXCELP&D].[dbo].[LotOptions]([lotOptionID]),
	FOREIGN KEY (packageIDFK) REFERENCES [EXCELP&D].[dbo].[Packages](packageID),
	PRIMARY KEY (lotOptionIDFK, packageIDFK)
)

CREATE TABLE [EXCELP&D].[dbo].[PackageToProject] (
	packageIDFK int NOT NULL,
	projectIDFK int NOT NULL,
	FOREIGN KEY (projectIDFK) REFERENCES [EXCELP&D].[dbo].[Projects]([Project ID]),
	FOREIGN KEY (packageIDFK) REFERENCES [EXCELP&D].[dbo].[Packages](packageID),
	PRIMARY KEY (packageIDFK, projectIDFK)
)