--CREATE TABLE [EXCELP&D].[dbo].[Plans] (
--	[planID] [int] IDENTITY(1,1) PRIMARY KEY,
--	[jobIDFK] [int] NOT NULL,
--	[planNumber] [nvarchar](255) NULL,
--	[thisPhaseOnly] [bit] NULL,
--);

CREATE TABLE [EXCELP&D].[dbo].[WorkOrders] (
	workOrderID int IDENTITY(10000,1) PRIMARY KEY,
	userIDFK int,
	dateCreated DATE,
	dateNeeded DATE,
	completed BIT NOT NULL,
	FOREIGN KEY (userIDFK) REFERENCES Users(userID),
);

CREATE TABLE [EXCELP&D].[dbo].[WorkOrderEntries] (
	workOrderEntryID int IDENTITY(1,1) PRIMARY KEY,
	workOrderIDFK int,
	partCompleted BIT,
	partType nvarchar(255),
    areaForeman nvarchar(255), 
    builder nvarchar(255), 
    project nvarchar(255),
    lot nvarchar(255), 
    quantity nvarchar(255), 
    partsOrdered nvarchar(255), 
    sizes nvarchar(255), 
    colorAndMaterial nvarchar(255),
    reasonCode nvarchar(255), 
    howToProcess nvarchar(255), 
    dateNeeded nvarchar(255)
	FOREIGN KEY (workOrderIDFK) REFERENCES WorkOrders(workOrderID)
);

