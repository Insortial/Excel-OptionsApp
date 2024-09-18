
ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
DROP CONSTRAINT [Lot Order Details$DoorsLot Order Details];

--Drop nonclustered indices for Lot Order Detail columns
DROP INDEX [Lot Order Details].[Lot Order Details$Room ID];
DROP INDEX [Lot Order Details].[Lot Order Details$Knob ID];
DROP INDEX [Lot Order Details].[Lot Order Details$Door ID];
DROP INDEX [Lot Order Details].[Lot Order Details$Pull ID];

--Drop index for Lots Table
DROP INDEX idxlot_dates ON [EXCELP&D].[dbo].[Lots];

--Drop Initial Lot Order Details Primary Key
ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details] DROP CONSTRAINT [Lot Order Details$PrimaryKey];
--Drop Created Lot Order Details Primary Key
--ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details] DROP CONSTRAINT lot_order_details_primary_key;