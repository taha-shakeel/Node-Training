create table Permission (
id SERIAL PRIMARY KEY,
permission_name varchar(250)
)

create table Role (
id SERIAL PRIMARY KEY,
role_name varchar(250),
permission integer references Permission(id)
)

create table users(
id SERIAL PRIMARY KEY,
name varchar(250),
address varchar(250),
role_id integer references Role(id)
)

--Stored procedures
-- Register user with specified role if role does not exist create role
CREATE OR REPLACE PROCEDURE register_user_and_create_role(user_name varchar(250), user_address varchar(250), roleName varchar(250))
LANGUAGE plpgsql
AS $$
DECLARE
ss integer;
roleId integer;
begin
	select count(*) into ss from role where role_name = roleName;
	if ss = 0 then 
		insert into role (role_name) values (roleName);
	END IF;
	select id into roleId from role where roleName = roleName;
	insert into users (name, address, role_id) values (user_name, user_address, roleId);
	commit;
end;
$$;

-- Calling the above stored procedure
call register_user_and_create_role('Taha_Shakeel', 'Karachi', 'Admin')
call register_user_and_create_role('Omar Farooq', 'Lahore', 'Admin')
call register_user_and_create_role('Junaid', 'World', 'Moderator')

-- Checking the results
select * from users as u
inner join role as r
on r.id = u.role_id 

-- Stored procedure
-- Assign permission in role and create permission if it does not exist
CREATE OR REPLACE PROCEDURE assign_permission_to_role(role_id int, permissionName varchar(250))
LANGUAGE plpgsql
AS $$
DECLARE
permissionCount int;
roleExist int;
permissionId int;
begin
	select count(*) into permissionCount from permission where permission_name = permissionName;
	if permissionCount = 0 then 
		insert into permission (permission_name) values (permissionName);
	END IF;
	select count(*) into roleExist from role where id = role_id;
	if roleExist = 0 then
		rollback;
		return;
	end if;
	select id into permissionId from permission where permission_name = permissionName;
	update role set permission = permissionId where id = role_id;
	commit;
end;
$$;

-- Calling the above stored procedure
select * from role
select * from permission
call assign_permission_to_role(2, 'Global')
call assign_permission_to_role(3, 'Create-Edit-Read')

-- Checking the results
select * from users as u
inner join role as r
on r.id = u.role_id 


-- Views
create or replace view user_information as
	select u.id as user_id,
	u.name,
	u.address,
	r.id as role_id,
	r.role_name as roleName,
	p.id,
	p.permission_name as permissionName
	from users as u
	inner join role as r
	on r.id = u.role_id
	inner join permission as p
	on p.id = r.permission
	-- inner join "permission" as p on p.id = r.permission
	-- where u.id = 2
select * from user_information where user_id = 2
select * from user_information where user_id = 1

