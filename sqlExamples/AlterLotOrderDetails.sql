--Alter columns data type 
ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ALTER COLUMN [Door ID] nvarchar(100) NOT NULL

ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ALTER COLUMN [Knob ID] nvarchar(100) NOT NULL

ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ALTER COLUMN [Pull ID] nvarchar(100) NOT NULL

ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ALTER COLUMN [Hardware Comments] nvarchar(MAX) NOT NULL

Alter RoomID NULL values to be N/A
UPDATE [EXCELP&D].[dbo].[Lot Order Details]
SET [Room ID] = 'N/A'
WHERE [Room ID] IS NULL;

ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ALTER COLUMN [Room ID] VARCHAR(255) NOT NULL;