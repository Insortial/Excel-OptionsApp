CREATE PROCEDURE delete_work_order
	(@workOrderID int)
WITH EXECUTE AS OWNER
AS
BEGIN
	SET NOCOUNT ON; 

	DELETE FROM [WorkOrderEntries] WHERE workOrderIDFK = @workOrderID; 
	DELETE FROM [WorkOrders] WHERE workOrderID = @workOrderID;

	-- For TestTable1
	DECLARE @max1 int;
	SELECT @max1 = max([workOrderID]) from [WorkOrders];
	IF @max1 IS NULL 
		SET @max1 = 10000;
	DBCC CHECKIDENT ('[WorkOrders]', RESEED, @max1);

	-- For TestTable2
	DECLARE @max2 int;
	SELECT @max2 = max([workOrderEntryID]) from [WorkOrderEntries];
	IF @max2 IS NULL 
		SET @max2 = 0;
	DBCC CHECKIDENT ('[WorkOrderEntries]', RESEED, @max2);
END
GO