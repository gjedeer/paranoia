#!/bin/sh
rm ../paranoia.xpi
zip -r ../paranoia.xpi * -x .git\* -x modules/stdlib/.git\* -x website/\* -x \*.sh -x .\* -x \*/.directory -x modules\*
