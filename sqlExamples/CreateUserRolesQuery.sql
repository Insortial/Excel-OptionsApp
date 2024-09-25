--INSERT INTO Roles (roleName, roleDescription) VALUES ('USER', 'Standard user for EXCELP&D');
--INSERT INTO Roles (roleName, roleDescription) VALUES ('ADMIN', 'Admin role for EXCELP&D');
--INSERT INTO Roles (roleName, roleDescription) VALUES ('CS', 'Customer Service');
--INSERT INTO Roles (roleName, roleDescription) VALUES ('48HR', '48 Hour Report Role');
--INSERT INTO Roles (roleName, roleDescription) VALUES ('OPT', 'Role for creating Options Contracts');

UPDATE UsersToRoles
SET roleIDFK = (SELECT [roleID] FROM Roles WHERE roleName = 'ADMIN')