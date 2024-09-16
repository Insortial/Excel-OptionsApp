select * from sys.indexes
where object_id = (select object_id from sys.objects where name = 'Jobs');


--Create indices for Lots Table
CREATE INDEX idxlot_job
ON [EXCELP&D].[dbo].[Lots] ([Job IDFK]);

CREATE INDEX idxlot_dates
ON [EXCELP&D].[dbo].[Lots] ([Date Production Completed], [Job IDFK]);

CREATE INDEX idx_jobs_name ON Jobs ([Job Name]);
CREATE INDEX idx_lots ON Lots ([Lot Number]);

--ADD nonclustered indices for Lot Order Details columns
CREATE NONCLUSTERED INDEX [Lot Order Details$Room ID] ON [EXCELP&D].[dbo].[Lot Order Details]([Room ID]);
CREATE NONCLUSTERED INDEX [Lot Order Details$Knob ID] ON [EXCELP&D].[dbo].[Lot Order Details]([Knob ID]);
CREATE NONCLUSTERED INDEX [Lot Order Details$Pull ID] ON [EXCELP&D].[dbo].[Lot Order Details]([Pull ID]);
CREATE NONCLUSTERED INDEX [Lot Order Details$Door ID] ON [EXCELP&D].[dbo].[Lot Order Details]([Door ID]);

--Create composite index for Lot Order Details Table
ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details] 
ADD CONSTRAINT lot_order_details_primary_key PRIMARY KEY ([Lot ID], [Construction ID], [Room ID], [Material ID], [Door ID], [Color ID], [Hinge ID], [Knob ID], [Drawer Box ID], [Drawer Guide ID], [Pull ID])