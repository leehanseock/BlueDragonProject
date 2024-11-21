--------------------------------------------------------
--  颇老捞 积己凳 - 格夸老-11岿-21-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table ATTACHED_FILE
--------------------------------------------------------

  CREATE TABLE "C##BLUE"."ATTACHED_FILE" 
   (	"FILE_ID" NUMBER(*,0), 
	"POST_ID" NUMBER(*,0), 
	"ATTACHED_FILE" BLOB
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "USERS" 
 LOB ("ATTACHED_FILE") STORE AS SECUREFILE (
  TABLESPACE "USERS" ENABLE STORAGE IN ROW 4000 CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) ;

   COMMENT ON TABLE "C##BLUE"."ATTACHED_FILE"  IS '梅何颇老';
REM INSERTING into C##BLUE.ATTACHED_FILE
SET DEFINE OFF;
--------------------------------------------------------
--  DDL for Index SYS_C008361
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##BLUE"."SYS_C008361" ON "C##BLUE"."ATTACHED_FILE" ("FILE_ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Trigger TRG_ATTACHED_FILE_ID
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "C##BLUE"."TRG_ATTACHED_FILE_ID" 
BEFORE INSERT ON attached_file
FOR EACH ROW
BEGIN
  :NEW.file_id := attached_file_seq.NEXTVAL;
END;

/
ALTER TRIGGER "C##BLUE"."TRG_ATTACHED_FILE_ID" ENABLE;
--------------------------------------------------------
--  Constraints for Table ATTACHED_FILE
--------------------------------------------------------

  ALTER TABLE "C##BLUE"."ATTACHED_FILE" MODIFY ("FILE_ID" NOT NULL ENABLE);
  ALTER TABLE "C##BLUE"."ATTACHED_FILE" MODIFY ("POST_ID" NOT NULL ENABLE);
  ALTER TABLE "C##BLUE"."ATTACHED_FILE" ADD PRIMARY KEY ("FILE_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ATTACHED_FILE
--------------------------------------------------------

  ALTER TABLE "C##BLUE"."ATTACHED_FILE" ADD CONSTRAINT "FK_ATTACHED_FILE_POST_ID_SITE_POST_POST_ID" FOREIGN KEY ("POST_ID")
	  REFERENCES "C##BLUE"."SITE_POST" ("POST_ID") ENABLE;
