select * from sys.indexes
where object_id = (select object_id from sys.objects where name = 'Jobs');

--DROP INDEX idxlot_dates ON [TESTEXCELDB].[dbo].[Lots];

--CREATE INDEX idxlot_job
--ON [TESTEXCELDB].[dbo].[Lots] ([Job IDFK]);

--CREATE INDEX idxlot_dates
--ON [TESTEXCELDB].[dbo].[Lots] ([Date Production Completed], [Job IDFK]);

CREATE INDEX idx_jobs_name ON Jobs ([Job Name]);
CREATE INDEX idx_lots ON Lots ([Lot Number]);