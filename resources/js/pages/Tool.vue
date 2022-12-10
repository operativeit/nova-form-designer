<template>
  <div>
    <Head title="Nova Form Designer" />

    <Heading class="mb-6">Nova Form Designer</Heading>

<div class="grid md:grid-cols-12 gap-6">
<div class="md:col-span-2">
    <Card
      v-draggable="item"
      v-for="(item,index) in items1"
      :key="item.id"
      class="px-3 py-2 my-4"
    >
      <div class="flex">
       <div class="mr-3">
          <component
            :is="`heroicons-outline-${item.icon}`"
            height="18"
            width="18"
          />
       </div>
       <div class="flex relative ml-auto flex-shrink-0 text-sm font-bold">
       {{item.title}}
       </div>
     </div>
    </Card>
  </div>
  <Card class="md:col-span-6 px-6 py-4">

    <div v-if="items2.length">

    <div
      v-for="(item,index) in items2"
      :key="item.id"
    >
      <div class="drop-el-wrapper" 
        v-droppable
        @v-drag-leave="onDragLeave"
        @v-drag-over="onDragOver"
        @v-drag-drop="(data,allow,evt) => onDrop(data, index, items2)">
        <div class="drop-el-line" />
        <div class="drop-el-label">drag here</div>
      </div>

      <div class="flex relative mx-2">
        <div class="mr-3 drag-el-btn text-sm font-bold">{{item.title}}</div>
        <div class="flex relative ml-auto w-[2rem] flex-shrink-0 drag-el-btn" @click="onRemove(item,items2)">x</div>
      </div>

      <div class="drag-el" tabindex="-1"
        v-draggable="item"
        @v-drag-start="onDragStart"
        @click="getFieldProperties(item)"
      >
                    <component
                        :is="'form-' + item.component"
                        :resource-name="resourceName"
                        :field="{...defaultAttributes, ...item.attributes}"
                        :errors="validationErrors"
                        :via-resource="viaResource"
                        :via-resource-id="viaResourceId"
                        :via-relationship="viaRelationship"
                        :showHelpText="item.attributes.helpText"
                        class="w-full"
                    />
      </div>
 
      <div class="drop-el-wrapper"
        v-if="index == items2.length - 1"
        v-droppable
        @v-drag-leave="onDragLeave"
        @v-drag-over="onDragOver"
        @v-drag-drop="(data,allow,evt) => onDrop(data, index+1, items2)">
        <div class="drop-el-line" />
        <div class="drop-el-label">drag here</div>
      </div>

   </div>
    </div>
    <div v-else class="h-full">
      <div
        class="drop-zone flex flex-col items-center justify-center h-full"
        v-droppable
        @v-drag-leave="onDragLeave"
        @v-drag-over="onDragOver"
        @v-drag-drop="(data,allow,evt) => onDrop(data, item, items2)">

	<div class="w-1/6 m-10 pointer-events-none">
<svg class="text-primary-500 dark:text-primary-600" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494 492"><path class="" fill="currentColor" d="M357.464858,88.3197621 C356.007587,89.7731912 354.100792,90.8076945 351.91325,91.184 C346.643273,92.0696 340.55125,93.7568706 333.840762,96.1647765 C332.688738,96.5767059 331.515488,96.7619294 330.3625,96.7619294 C326.143238,96.7619294 322.191238,94.1485412 320.66775,89.9501412 C318.7535,84.5998824 321.53225,78.7132471 326.884238,76.7790118 C334.747715,73.9591765 342.012988,71.9834588 348.476477,70.8721176 C348.961603,70.7954549 349.44457,70.7532564 349.922738,70.743781 C349.9189,70.4238759 349.916988,70.1032877 349.916988,69.782 C349.916988,65.1301882 350.349238,60.5825647 351.213738,56.1574588 C352.28375,50.6007529 357.635738,46.9580235 363.27525,48.0076235 C368.853012,49.0774824 372.496262,54.4692235 371.42625,60.0674118 C370.829012,63.2364706 370.5,66.4884941 370.5,69.8225176 C370.5,72.3336471 370.664988,74.7618118 371.014262,77.1282353 C371.817012,82.7466824 367.926762,87.9744235 362.28725,88.7770588 C361.79325,88.8388 361.29925,88.8802824 360.80525,88.8802824 C359.644864,88.8802824 358.519365,88.6841668 357.464858,88.3197621 Z M112.892398,288.353484 C131.722318,301.360374 144.08338,323.0923 144.083977,347.657812 C144.083977,387.378612 111.768465,419.689506 72.0419883,419.689506 C32.3155117,419.689506 -1.84741111e-13,387.377647 -1.84741111e-13,347.657812 C-1.84741111e-13,307.937976 32.3155117,275.626118 72.0419883,275.626118 C79.7380815,275.626118 87.1560627,276.838846 94.1148474,279.083224 C95.7814215,273.702036 98.1796971,268.00261 101.27,262.064282 C103.904988,257.021765 110.120512,255.066306 115.16375,257.700918 C120.206988,260.335529 122.1415,266.550165 119.526773,271.592682 C116.337,277.6848 114.114,283.323506 112.899262,288.324541 C112.896985,288.334194 112.894696,288.343841 112.892394,288.353481 Z M399.378738,300.220329 C420.57925,321.438071 432.25,349.592047 432.25,379.557741 C432.25,441.401176 381.92375,491.720235 320.069547,491.719271 L195.540059,491.719271 C189.859059,491.719271 185.24807,487.108941 185.24807,481.428753 C185.24807,453.069294 208.34257,429.978094 236.706082,429.978094 L253.028344,429.978094 L174.338582,351.299576 C168.265855,345.228682 164.911094,337.160847 164.911094,328.578824 C164.911094,319.9968 168.26682,311.928965 174.338582,305.858071 C186.462809,293.7568 207.621832,293.715318 219.76632,305.858071 L238.209309,324.298424 C239.774285,320.779176 241.976059,317.485671 244.858047,314.625318 C252.000785,307.484565 262.231023,304.129318 272.069535,305.529106 C273.242785,299.437953 276.166262,293.613059 280.879523,288.900471 C289.874762,279.907482 302.882785,277.354871 314.162773,281.286047 C315.666,276.552235 318.300023,272.086612 322.046512,268.3204 C334.5615,255.8072 354.959262,255.8072 367.47425,268.3204 L399.378738,300.220329 Z M320.070512,471.140165 C370.582012,471.140165 411.666988,430.062024 411.666023,379.556776 C411.666023,355.107271 402.136262,332.098071 384.846262,314.810541 L352.941773,282.910612 C348.434023,278.403506 341.127262,278.403506 336.619512,282.910612 C332.111762,287.417718 332.111762,294.723435 336.619512,299.230541 C338.637,301.247741 339.625,303.881388 339.625,306.516 C339.625,309.150612 338.615773,311.784259 336.619512,313.801459 C332.605762,317.814635 326.080523,317.814635 322.066773,313.801459 L311.774785,303.510941 C307.267035,299.003835 299.960273,299.003835 295.452523,303.510941 C293.270047,305.692141 292.076535,308.593976 292.076535,311.660776 C292.076535,314.727576 293.271012,317.649671 295.452523,319.810612 L305.744512,330.101129 C307.741738,332.098071 308.75,334.731718 308.75,337.366329 C308.75,340.000941 307.740773,342.634588 305.744512,344.651788 C301.730762,348.664965 295.205523,348.664965 291.191773,344.651788 L275.754273,329.216494 C271.39125,324.853129 263.796,324.853129 259.432012,329.216494 C257.249535,331.397694 256.056023,334.299529 256.056023,337.366329 C256.056023,340.433129 257.2505,343.355224 259.432012,345.516165 L285.1615,371.241976 C287.158727,373.259176 288.166988,375.892824 288.166988,378.527435 C288.166988,381.162047 287.157762,383.795694 285.1615,385.812894 C281.14775,389.826071 274.622512,389.826071 270.608762,385.812894 L205.215512,320.428988 C200.852488,316.065624 193.257238,316.086847 188.89325,320.428988 C186.711738,322.610188 185.497,325.512024 185.497,328.578824 C185.497,331.645624 186.711738,334.567718 188.89325,336.728659 L285.141238,432.962894 C288.084977,435.906212 288.969738,440.331318 287.364238,444.179529 C285.779,448.027741 282.01225,450.538871 277.854738,450.538871 L236.68775,450.538871 C223.288,450.560094 211.843988,459.162376 207.583238,471.140165 L320.070512,471.140165 Z M72.0419883,399.108471 C100.4055,399.108471 123.5,376.017271 123.5,347.657812 C123.5,319.298353 100.4055,296.207153 72.0419883,296.207153 C43.6784766,296.207153 20.5839766,319.298353 20.5839766,347.657812 C20.5839766,376.017271 43.6784766,399.108471 72.0419883,399.108471 Z M400.57225,116.622329 C405.738988,118.988753 408.002512,125.080871 405.655047,130.267129 C403.926047,134.0536 400.179559,136.276282 396.269047,136.276282 C394.848797,136.276282 393.388023,135.967576 391.988035,135.350165 C384.701535,132.016141 378.032535,127.509035 372.207773,121.932071 C368.09175,118.021153 367.947023,111.497812 371.878762,107.381412 C375.8105,103.265976 382.335738,103.101012 386.4315,107.052447 C390.589012,111.024141 395.343762,114.255906 400.57225,116.622329 Z M395.158512,2.95682353 C400.428488,0.837364706 406.418238,3.40927059 408.537035,8.65823529 C410.657762,13.9274588 408.104785,19.9366118 402.835773,22.0358118 C397.505012,24.1755294 392.6065,27.1805882 388.242512,30.9468 C386.328262,32.6138118 383.920012,33.4367059 381.532023,33.4367059 C378.650035,33.4367059 375.789273,32.2221412 373.751523,29.8759765 C370.026262,25.5946118 370.5,19.0915294 374.781012,15.3870588 C380.852773,10.1188 387.72825,5.94065882 395.158512,2.95682353 Z M463.783988,11.1684 C468.415238,14.4821647 469.48525,20.9032471 466.171977,25.5126118 C464.134227,28.3121882 460.984977,29.8142353 457.773977,29.8142353 C455.694738,29.8142353 453.6155,29.1968235 451.804488,27.9002588 C447.132715,24.5662353 441.965977,22.0551059 436.470227,20.4498353 C431.015965,18.8445647 427.886977,13.1441176 429.492477,7.66941176 C431.097977,2.21592941 436.840727,-0.892352941 442.274727,0.692658824 C449.993477,2.95682353 457.238488,6.47607059 463.783988,11.1684 Z M449.787,113.103082 C454.583238,110.057506 460.943488,111.394588 464.010727,116.189176 C467.077965,120.963506 465.719465,127.343106 460.923227,130.409906 C454.17125,134.753012 446.782477,137.922071 438.960488,139.836047 C438.136512,140.042494 437.3135,140.124494 436.51075,140.124494 C431.8795,140.124494 427.659273,136.975694 426.527512,132.263106 C425.190238,126.727624 428.586488,121.170918 434.1025,119.832871 C439.680262,118.474565 444.9705,116.2104 449.787,113.103082 Z M491.118012,49.5299294 C493.032262,56.1159765 494,62.9489882 494,69.8427765 C494,77.9106118 492.682988,85.8337412 490.068262,93.3873882 C488.586262,97.6272706 484.592773,100.3024 480.332023,100.3024 C479.220523,100.3024 478.087797,100.117176 476.956035,99.7467294 C471.583785,97.8944941 468.743285,92.0290824 470.595785,86.6576 C472.469512,81.2648941 473.416023,75.5847059 473.416023,69.8225176 C473.416023,64.8832235 472.736773,60.0056706 471.358012,55.3336 C469.752512,49.8801176 472.8815,44.1787059 478.335762,42.5531765 C483.851773,41.0096471 489.512512,44.0967059 491.118012,49.5299294 Z M185.167988,166.776424 C189.490488,163.113435 195.974238,163.565882 199.679238,167.908024 C203.384238,172.209647 202.869977,178.712729 198.547477,182.4172 C193.401965,186.862565 188.317238,191.349412 183.418727,195.876776 C181.422465,197.688494 178.931238,198.573129 176.440977,198.573129 C173.662227,198.573129 170.883477,197.461788 168.865988,195.239106 C165.017227,191.060965 165.30475,184.536659 169.483488,180.688447 C174.588477,175.996118 179.816,171.345271 185.167988,166.776424 Z M139.658238,210.345435 C143.527262,206.167294 150.011012,205.920329 154.210012,209.769506 C158.387785,213.638941 158.634785,220.142024 154.786023,224.320165 C150.093023,229.382941 145.708773,234.404235 141.633273,239.385012 C139.575262,241.854659 136.631523,243.151224 133.647262,243.151224 C131.362512,243.151224 129.037238,242.389106 127.14325,240.825318 C122.738738,237.223106 122.100977,230.740282 125.702738,226.3364 C130.025238,221.068141 134.697977,215.716918 139.658238,210.345435 Z M288.06375,94.6627294 C293.0655,91.9461176 299.30225,93.8195765 302.020215,98.7993882 C304.737215,103.800424 302.884715,110.036282 297.882965,112.752894 C292.180738,115.839953 286.355977,119.194235 280.427977,122.775224 C278.740465,123.783341 276.908227,124.277271 275.097215,124.277271 C271.617988,124.277271 268.221738,122.508 266.287227,119.317718 C263.343488,114.460424 264.9075,108.142565 269.765488,105.178988 C275.96075,101.412776 282.074,97.8935294 288.06375,94.6627294 Z M234.71175,128.188188 C239.363262,124.895647 245.765,126.006988 249.057047,130.656871 C252.350059,135.287459 251.238559,141.708541 246.587047,145.001082 C241.112523,148.870518 235.637035,152.862471 230.203035,156.978871 C228.350535,158.378659 226.169023,159.057812 224.007773,159.057812 C220.900012,159.057812 217.812512,157.658988 215.795023,154.962635 C212.35825,150.435271 213.263273,143.972706 217.812512,140.556682 C223.4115,136.317765 229.051012,132.201365 234.71175,128.188188 Z"></path></svg>
	</div>
	<h4 class="text-primary-500 text-xl dark:text-primary-600 font-bold pointer-events-none">Drag elements here</h4>
        <div class="pointer-events-none">Grab an element from the left and drop it here</div>

      </div>
    </div>

   </Card>
   <Card class="md:col-span-4 px-3 py-2">

      <div class="flex">
       <div class="mr-3 text-sm font-bold">Properties</div>
      </div>
     <!--div>
       <label class="form-label">name</label>
       <input type="text" class="form-control form-input form-input-bordered p-1" v-model="currentField.name"/>
     </div>
     <div>
       <label>placeholder</label>
       <input type="text" class="form-control form-input form-input-bordered p-1" v-model="currentField.placeholder"/>
     </div>
     <div>
       <input type="checkbox" v-model="currentField.visible" />
       <label>visible</label>
     </div>
     <div>
       <input type="checkbox" v-model="currentField.required"/>
       <label>required</label>
     </div>
     <div>
       <label>description</label>
       <textarea class="form-control form-input form-input-bordered p-1" v-model="currentField.helpText"/>
     </div>
     <div>
	<key-value-field name="options" :options="currentField.options" />
     </div-->
     <!--pre v-html="prettyJSON(currentField.editable)" /-->

     <div
       v-for="(property,index) in currentField.editable"
       :key="index"
     >
	{{currentField.attributes[index]}}
                    <component
                        :is="'form-' + property.component"
			value="abc"
                        @input="(event) => onInput(event, item)"
                        :resource-name="resourceName"
                        :field="{...property.attributes, value: currentField.attributes[index]}"
                        :errors="validationErrors"
                        :via-resource="viaResource"
                        :via-resource-id="viaResourceId"
                        :via-relationship="viaRelationship"
                        :showHelpText="property.attributes.helpText"
                    />
     </div>
   </Card>

</div>

</div>

</template>

<script>
import {
  Errors,
  HandlesFormRequest,
  Minimum
} from 'laravel-nova'

import each from 'lodash/each'
import tap from 'lodash/tap'

import { draggable, droppable } from 'v-drag-drop';
import { getCurrentInstance} from "vue";

export default {
  directives: {
    draggable, droppable
  },
  data() {
    return {
      defaultAttributes: {
            prefixComponent: true,
            visible: true,
            required: false,
            stacked: true,
            fieldClasses: 'abc',
      },
      currentField: {
      },
      commonProperties: {
      },
      dragOver: null,
      items1: [
        {
          title: 'text',
          icon: 'cog',
          component: 'text-field',
          attributes: {
            name: 'text',            
          },
        },
        {
          title: 'password',
          icon: 'key',
          component: 'password-field',
          attributes: {
            name: 'password',
          },
        },
        {
          title: 'email',
          icon: 'at-symbol',
          component: 'email-field',
          attributes: {
            name: 'email',
          },
        },
        {
          title: 'number',
          icon: 'number',
          component: 'text-field',
          attributes: {
            name: 'number',
            type: 'number',
          },
          editable: {
            name: {
	      'component':'text-field',
              'attributes': {
                 'name': 'name'
              }
            },
            placeholder: {
              'component':'text-field',
              'attributes': {
                 'name': 'placeholder'
              }
            },
            visible: {
              'component':'boolean-field',
              'attributes': {
                 'name': 'visible',
              }
            },
            required: {
              'component':'boolean-field',
              'attributes': {
                 'name': 'required',
              }
            },
            min: {
              'component':'text-field',
              'attributes': {
                 name: 'min',
                 type: 'number'
              }
            }, 
            max: {
              'component':'text-field',
              'attributes': {
                 name: 'max',
                 type: 'number'
              }
            },
            step: {
              'component':'text-field',
              'attributes': {
                name: 'step',
                type: 'number'
              }
            },
          }
        },
        {
          title: 'textarea',
          component: 'textarea-field',
          attributes: {
            name: 'textarea',
          },
        },
        {
          title: 'select1',
          component: 'select-field',
          attributes: {
            name: 'select1',
            placeholder:'select1',
            options: [
              {label : 'France', value: 'fr'},
              {label : 'España', value: 'es'},
              {label : 'United Kingdom', value: 'gb'}
            ]
          },
          editable: {
            name: {
              'component':'text-field',
              'attributes': {
                 'name': 'name'
              }
            },
            options: {
              'component':'key-value-field',
              'attributes': {
                 name: 'options',
	         keyLabel: 'label',
                 valueLabel: 'value',
                 actionText: 'add row',
                 canAddRow: true,
		 canDeleteRow: true,
              }
            },
          }
        },
        {
          title: 'multiselect',
          component: 'multi-select-field',
          attributes: {
            name: 'multiselect',
            options: [
              {label : 'France', value: 'fr'},
              {label : 'España', value: 'es'},
              {label : 'United Kingdom', value: 'gb'}
            ]
          },
        },
        {
          title: 'tag',
          icon: 'tag',
          component: 'tag-field',
          attributes: {
            name: 'tags',
          },
        },
        {
          title: 'boolean',
          icon: 'check',
          component: 'boolean-field',
          attributes: {
            name: 'boolean',
          },
        },
        {
          title: 'boolean group',
          icon: 'check',
          component: 'boolean-group-field',
          attributes: {
            name: 'boolean group',
          },
        },
        {
          title: 'toggle',
          icon: 'check',
          component: 'nova-toggle',
          attributes: {
            name: 'toggle',
          },
        },
        {
          title: 'date',
          icon: 'calendar',
          component: 'date-field',
          attributes: {
            name: 'date',
          },
        },
        {
          title: 'datetime',
          icon: 'clock',
          component: 'date-time-field',
          attributes: {
            name: 'datetime',
          },
        },
        {
          title: 'currency',
          icon: 'currency-euro',
          component: 'currency-field',
          attributes: {
            name: 'currency',
          },
        },
        {
          title: 'color',
          icon: 'color-swatch',
          component: 'color-field',
          attributes: {
            name: 'color',
            placeholder:'',
          },
        },
        {
          title: 'url',
          icon: 'globe',
          component: 'url-field',
          attributes: {
            name: 'url',
          },
        },
        {
          title: 'key/value',
          icon: 'table',
          component: 'key-value-field',
          attributes: {
            name: 'key/value',
          },
        },
        {
          title: 'file',
          icon: 'document-duplicate',
          component: 'file-field',
          attributes: {
            name: 'file',
          },
        },
        {
          title: 'image',
          icon: 'photograph',
          component: 'file-field',
          attributes: {
            name: 'image',
          },
        },
        {
          title: 'markdown',
          icon: '',
          component: 'markdown-field',
          attributes: {
            name: 'markdown',
          },
        },
        {
          title: 'trumbowyg',
          icon: '',
          component: 'o1-trumbowyg-field',
          attributes: {
            name: 'trumbowyg',
            fullWidth: true,
          },
        },
      ],
      items2: [
      ]
    }
  },
  computed: {
  },
  methods: {
    prettyJSON: function (json) {
        if (json) {
            json = JSON.stringify(json, undefined, 4)
            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
            var cls = 'number'
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                cls = 'key'
                } else {
                cls = 'string'
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean'
            } else if (/null/.test(match)) {
                cls = 'null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
            })
        }
    },

    onInput(event, index) {
      console.log(event.type, ':', event.target.value);
      this.currentField.attributes[index] = event.target.value
    },

    onDragStart(item, evt) {
      console.log('start', item, evt);

	/*
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
       */
    },
    onRemove(item, list) {
      list.splice(list.indexOf(item), 1);
    }, 
    onClone(item, list) {

    },

    getFieldProperties(item) {
	this.currentField = item;
    },

    onDragOver(item, allow, evt) {
	if (!evt.target.classList.contains('drag-over')) {
           evt.target.classList.add('drag-over');
        }
    },

    onDragLeave(item, allow, evt) {
	evt.target.classList.remove('drag-over');
    },

    onDrop(item, index, list) {
      console.log('drop', item ,'@', index,'in', list)

      if (list.includes(item)) {
         console.log('reorder');
         list.splice(list.indexOf(item), 1);
         list.splice(index, 0, item);
      } else {
         console.log('append', index)
	 list.splice(index, 0, item);
      }

      this.currentField = item;
    }
  },
  mounted() {
  }
};

</script>

<style>
</style>
