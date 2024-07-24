CREATE TABLE [EXCELP&D].[dbo].[LotDocument] (
	lotDocumentID int IDENTITY(1,1) NOT NULL UNIQUE,
	jobDocumentID int NOT NULL,
	lotID int NOT NULL,
	upperHeight varchar(50),
	islands varchar(50),
	crown varchar(50),
	lightRail varchar(50),
	baseShoe varchar(50),
	recyclingBins varchar(50),
	lotOptionsValue float,
	lotFooter varchar(50),
	kitchen varchar(50),
	masterBath varchar(50),
	bath2 varchar(50),
	bath3 varchar(50),
	bath4 varchar(50),
	powder varchar(50),
	laundry varchar(50),
	lotFooterNotes varchar(50),
	FOREIGN KEY (jobDocumentID) REFERENCES [EXCELP&D].[dbo].[JobDocument](jobDocumentID) ON DELETE CASCADE,
	FOREIGN KEY (lotID) REFERENCES [EXCELP&D].[dbo].[Lots]([Lot ID]),
	PRIMARY KEY (jobDocumentID, lotDocumentID)
)