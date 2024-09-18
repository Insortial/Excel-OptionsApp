CREATE PROCEDURE delete_package
	(@packageID int)
AS
BEGIN
	DECLARE @lotIDS TABLE (
		lotID int
	)

	INSERT INTO @lotIDS (lotID)
		SELECT LO.lotIDFK 
		FROM LotOptionToPackage AS LP
		INNER JOIN LotOptions AS LO ON LP.lotOptionIDFK = LO.lotOptionID
		WHERE packageIDFK = @packageID;

	DELETE FROM [Lot Order Details] WHERE [Lot ID] IN (SELECT * FROM @lotIDS);
	DELETE FROM [LotOptionToPackage] WHERE packageIDFK = @packageID;
	DELETE FROM [LotOptions] WHERE lotIDFK IN (SELECT * FROM @lotIDS);
	DELETE FROM [PackageToProject] where packageIDFK = @packageID;
	DELETE FROM [Packages] WHERE packageID = @packageID;
END