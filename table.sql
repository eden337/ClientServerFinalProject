create table users(
    Id serial,
    name varchar(255),
    password varchar(255),

    primary key (id)
);

create table requests(
    Id serial,
    Social varchar(255),
    name varchar(255),
    email varchar(255),
    phone varchar(255),
    insurance_amount varchar(255),
    previous_insurance_number varchar(255),
    previous_insurance_id varchar(255),
    previous_insurance_company varchar(255),
    comment varchar(255),
    primary key (id)
);
