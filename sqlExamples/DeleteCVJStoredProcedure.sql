CREATE PROCEDURE delete_CVJ
	(@jobID int, @jobName varchar(200))
AS
BEGIN
	SET NOCOUNT ON; 

	DECLARE @jobInfoID int;
	DECLARE @roomID int;
	DECLARE @cabinetID int;

	SELECT @jobInfoID = jobInfoID
	FROM CV_JobInfo
	WHERE jobIDFK = @jobID AND [Job Name] = @jobName;

	SELECT @roomID = RoomID
	FROM CV_Rooms
	WHERE jobInfoIDFK = @jobInfoID;

	SELECT @cabinetID = [Cabinet ID]
	FROM CV_Cabinets
	WHERE roomIDFK = @roomID;

	DELETE FROM [CV_Parts] WHERE jobInfoIDFK = @jobInfoID;

	DELETE FROM [CV_Doors] WHERE cabinetIDFK = @cabinetID; 
	DELETE FROM [CV_Rollouts] WHERE cabinetIDFK = @cabinetID;
	DELETE FROM [CV_Sections] WHERE cabinetIDFK = @cabinetID;
	DELETE FROM [CV_StockCabinets] WHERE cabinetIDFK = @cabinetID;

	DELETE FROM [CV_Cabinets] WHERE roomIDFK = @roomID;
	DELETE FROM [CV_Molding] WHERE roomIDFK = @roomID;
	DELETE FROM [CV_Tops] WHERE roomIDFK = @roomID;

	DELETE FROM [CV_Rooms] WHERE jobInfoIDFK = @jobInfoID;

	DELETE FROM [CV_JobInfo] WHERE jobInfoID = @jobInfoID;

	-- For TestTable1
	DECLARE @max1 int;
	SELECT @max1 = max([jobInfoID]) from [CV_JobInfo];
	IF @max1 IS NULL 
		SET @max1 = 0;
	DBCC CHECKIDENT ('[CV_JobInfo]', RESEED, @max1);

	-- For TestTable2
	DECLARE @max2 int;
	SELECT @max2 = max([RoomID]) from [CV_Rooms];
	IF @max2 IS NULL 
		SET @max2 = 0;
	DBCC CHECKIDENT ('[CV_Rooms]', RESEED, @max2);

	-- For TestTable3
	DECLARE @max3 int;
	SELECT @max3 = max([Cabinet ID]) from [CV_Cabinets];
	IF @max3 IS NULL 
		SET @max3 = 0;
	DBCC CHECKIDENT ('[CV_Cabinets]', RESEED, @max3);
END
GO