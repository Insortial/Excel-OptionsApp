BEGIN TRANSACTION;
EXEC sp_updatestats;
--Dropping Foreign Keys
ALTER TABLE [Lot Order Details]
DROP CONSTRAINT [Lot Order Details$KnobsLotOrderDetails]

ALTER TABLE [Lot Order Details]
DROP CONSTRAINT [Lot Order Details$Door IDLotOrderDetails]

ALTER TABLE [Lot Order Details]
DROP CONSTRAINT [Lot Order Details$Pull IDLotOrderDetails]

--Doors dropping, altering, and adding indices
ALTER TABLE [Doors]
DROP CONSTRAINT Door$PrimaryKey;

DROP INDEX [Doors$Door ID] On Doors;

ALTER TABLE [Doors]
ALTER COLUMN [Door ID] nvarchar(100) NOT NULL;

CREATE NONCLUSTERED INDEX [Doors$Door ID] ON [EXCELP&D].[dbo].[Doors]([Door ID]);

ALTER TABLE [Doors]
ADD CONSTRAINT Door$PrimaryKey
PRIMARY KEY ([Door ID]);

--Pulls dropping, altering, and adding indices
DROP INDEX [Pulls$Pull ID] On Pulls

ALTER TABLE [Pulls]
DROP CONSTRAINT Pulls$PrimaryKey

ALTER TABLE [Pulls]
ALTER COLUMN [Pull ID] nvarchar(100) NOT NULL;

ALTER TABLE [Pulls]
ADD CONSTRAINT Pulls$PrimaryKey
PRIMARY KEY ([Pull ID]);

CREATE NONCLUSTERED INDEX [Pulls$Pull ID] ON [EXCELP&D].[dbo].[Pulls]([Pull ID]);

--Knobs dropping, altering, and adding indices
DROP INDEX [Knobs$Knob ID] On Knobs

ALTER TABLE [Knobs]
DROP CONSTRAINT Knobs$PrimaryKey

ALTER TABLE [Knobs]
ALTER COLUMN [Knob ID] nvarchar(100) NOT NULL;

ALTER TABLE [Knobs]
ADD CONSTRAINT Knobs$PrimaryKey
PRIMARY KEY ([Knob ID]);

CREATE NONCLUSTERED INDEX [Knobs$Knob ID] ON [EXCELP&D].[dbo].[Knobs]([Knob ID]);


--Adding Foreign Key Constraints for Knob, Door, and Pull ID
ALTER TABLE [Lot Order Details]
ADD CONSTRAINT [Lot Order Details$KnobsLotOrderDetails]
FOREIGN KEY ([Knob ID]) REFERENCES Knobs([Knob ID]);

ALTER TABLE [Lot Order Details]
ADD CONSTRAINT [Lot Order Details$Door IDLotOrderDetails]
FOREIGN KEY ([Door ID]) REFERENCES Doors([Door ID]);

ALTER TABLE [Lot Order Details]
ADD CONSTRAINT [Lot Order Details$Pull IDLotOrderDetails]
FOREIGN KEY ([Pull ID]) REFERENCES Pulls([Pull ID]);


-- Check for any error in the previous statements
IF @@ERROR <> 0
BEGIN
    -- Rollback transaction if there is an error
    ROLLBACK TRANSACTION;
    PRINT 'Transaction rolled back due to an error.';
END
ELSE
BEGIN
    -- Commit the transaction if everything is successful
    COMMIT TRANSACTION;
    PRINT 'Transaction committed successfully.';
END