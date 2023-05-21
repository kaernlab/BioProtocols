.PHONY: student admin

student:
	@cd student && yarn

admin:
	@cd admin && yarn

app: student admin