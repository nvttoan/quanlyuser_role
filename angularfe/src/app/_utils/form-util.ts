import { FormGroup, FormArray, FormControl } from '@angular/forms';

export const markGroupDirty = (formGroup: FormGroup): void => {
  Object.keys(formGroup.controls).forEach(key => {
    switch (formGroup.get(key).constructor.name) {
      case 'FormGroup':
        markGroupDirty(formGroup.get(key) as FormGroup);
        break;
      case 'FormArray':
        markArrayDirty(formGroup.get(key) as FormArray);
        break;
      case 'FormControl':
        markControlDirty(formGroup.get(key) as FormControl);
        break;
    }
  });
};

export const markArrayDirty = (formArray: FormArray) => {
  formArray.controls.forEach(control => {
    switch (control.constructor.name) {
      case 'FormGroup':
        markGroupDirty(control as FormGroup);
        break;
      case 'FormArray':
        markArrayDirty(control as FormArray);
        break;
      case 'FormControl':
        markControlDirty(control as FormControl);
        break;
    }
  });
};

export const markControlDirty = (formControl: FormControl) => {
  formControl.markAsDirty();
  formControl.updateValueAndValidity();
};


export const getDataInForm = (data: string) =>{
    return data !== undefined ? (typeof data) === 'string' ? data.trim() : data : undefined;
}

