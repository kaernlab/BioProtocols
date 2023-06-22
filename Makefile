.PHONY: student admin server

student:
	@cd student && yarn

admin:
	@cd admin && yarn

app: student admin