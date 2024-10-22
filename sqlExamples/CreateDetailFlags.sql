--ALTER TABLE [EXCELP&D].[dbo].[Colors]
--DROP COLUMN inUse;

--ALTER TABLE [EXCELP&D].[dbo].[Interiors] 
--DROP COLUMN inUse;

--ALTER TABLE [EXCELP&D].[dbo].[Materials] 
--DROP COLUMN inUse;

--ALTER TABLE [EXCELP&D].[dbo].[Colors]
--ADD inUse BIT;

--ALTER TABLE [EXCELP&D].[dbo].[Interiors]
--ADD inUse BIT;

--ALTER TABLE [EXCELP&D].[dbo].[Materials]
--ADD inUse BIT;

--ALTER TABLE [EXCELP&D].[dbo].[Construction Type]
--ADD inUse BIT;

--ALTER TABLE [EXCELP&D].[dbo].[Drawer Front]
--ADD inUse BIT;

--ALTER TABLE [EXCELP&D].[dbo].[Drawer Boxes]
--ADD inUse BIT;

--ALTER TABLE [EXCELP&D].[dbo].[Hinges]
--ADD inUse BIT;

ALTER TABLE [EXCELP&D].[dbo].[Doors]
ADD inUse BIT;