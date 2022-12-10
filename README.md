# Nova Form Designer
A Laravel Nova 4 visual form designer. This tool lets create Nova form visually using drag an drop and produce json schema. 

![image](https://user-images.githubusercontent.com/188766/206865028-7b7748ff-ca61-4daf-bb01-629140f54ade.png)

## Installation
Same as most other Nova Packages

```
composer require eom-plus/nova-form-designer
```
## Call to contributors and sponsors
All comments, ideas and PR's are welcome. Hope that the Nova's community can help into making this tool production ready.

## Current status
It's in very early development stage.  Currently, the tool just shows how it's possible to drag/drop components to create a form, but it still doesn't allow saving or restore data. This part is quite trivial as just require some GET/POST data to Laravel api. 

I think that the biggest part is into how to set field properties easily. Including set options label/values for fields like select, checkboxes, tags.

Before go ahead, it would be interesting to discuss design and features.


## Roadmap
- refactor base code
- store/restore JSON data
- handle form properties such validations, required, visible, placeholder, label
- add layout management (rows, columns, header, footer).
- append all Nova's official fields
- append more 3rd party fields
- missing icons
- localization (i18n)
- remove Drag and Drop dependency from v-drag-drop lib
- ...
