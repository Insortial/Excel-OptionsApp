DROP TABLE [EXCELP&D].[dbo].[LotOptionToPackage];
DROP TABLE [EXCELP&D].[dbo].[PackageToProject];
DROP TABLE [EXCELP&D].[dbo].[Packages];

CREATE TABLE [EXCELP&D].[dbo].[Packages] (
	packageID int IDENTITY(1,1) NOT NULL UNIQUE,
	packageName VARCHAR(100) UNIQUE,
	PRIMARY KEY (packageID)
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