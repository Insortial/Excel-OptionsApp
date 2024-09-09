-- Add new columns to Lot Order Details
--ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
--ADD
--details varchar(MAX),
--handleType varchar(30)

--Drop nonclustered indices for columns
--DROP INDEX [Lot Order Details].[Lot Order Details$Room ID];
--DROP INDEX [Lot Order Details].[Lot Order Details$Knob ID];
--DROP INDEX [Lot Order Details].[Lot Order Details$Door ID];
--DROP INDEX [Lot Order Details].[Lot Order Details$Pull ID];

--Alter columns data type 
--ALTER TABLE [Lot Order Details]
--ALTER COLUMN [Door ID] nvarchar(100) NOT NULL

--ALTER TABLE [Lot Order Details]
--ALTER COLUMN [Knob ID] nvarchar(100) NOT NULL

--ALTER TABLE [Lot Order Details]
--ALTER COLUMN [Pull ID] nvarchar(100) NOT NULL

--Alter RoomID NULL values to be N/A
--UPDATE [Lot Order Details]
--SET [Room ID] = 'N/A'
--WHERE [Room ID] IS NULL;


--ALTER TABLE [Lot Order Details]
--ALTER COLUMN [Room ID] VARCHAR(255) NOT NULL;

--ADD nonclustered indices for columns
--CREATE NONCLUSTERED INDEX [Lot Order Details$Room ID] ON [Lot Order Details]([Room ID]);
--CREATE NONCLUSTERED INDEX [Lot Order Details$Knob ID] ON [Lot Order Details]([Knob ID]);
--CREATE NONCLUSTERED INDEX [Lot Order Details$Pull ID] ON [Lot Order Details]([Pull ID]);
--CREATE NONCLUSTERED INDEX [Lot Order Details$Door ID] ON [Lot Order Details]([Door ID]);




--Drop Initial Lot Order Details Primary Key
--ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details] DROP CONSTRAINT [Lot Order Details$PrimaryKey];
--Drop Created Lot Order Details Primary Key
--ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details] DROP CONSTRAINT lot_order_details_primary_key;

ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details] 
ADD CONSTRAINT lot_order_details_primary_key PRIMARY KEY ([Lot ID], [Construction ID], [Room ID], [Material ID], [Door ID], [Color ID], [Hinge ID], [Knob ID], [Drawer Box ID], [Drawer Guide ID], [Pull ID])
