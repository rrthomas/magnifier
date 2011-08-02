all:
	@echo "REL=VERSION make dist"

PACKAGE = magnifier
DIST_ZIP = $(PACKAGE)-${REL}.zip

dist:
	cd .. && \
	rm -f $(PACKAGE)*.zip && \
	zip $(DIST_ZIP) -r $(PACKAGE) -x "$(PACKAGE)/.git/*" && \
	mv $(DIST_ZIP) $(PACKAGE)/ && \
	chmod o+r $(PACKAGE)/$(DIST_ZIP)
