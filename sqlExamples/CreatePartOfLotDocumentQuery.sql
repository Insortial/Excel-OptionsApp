CREATE TABLE [EXCELP&D].[dbo].[PartOfLotDocument] (
	lotDocumentID int NOT NULL,
	lotID int NOT NULL,
	roomID nvarchar(255) NOT NULL,
	isPull BIT NOT NULL,
	details nvarchar(500),
	appliances nvarchar(500),
	FOREIGN KEY (lotID) REFERENCES [EXCELP&D].[dbo].[Lots]([Lot ID]),
	FOREIGN KEY (lotDocumentID) REFERENCES [EXCELP&D].[dbo].[LotDocument](lotDocumentID) ON DELETE CASCADE,
	PRIMARY KEY (lotDocumentID, lotID, roomID)
)