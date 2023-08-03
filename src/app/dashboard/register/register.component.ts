import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
    });

    const isEditable = this.router.snapshot.paramMap.get('isEditable');
  
    const editRecord = this.userDataService.getData();
    if (editRecord && isEditable === 'true') {
      this.editMode = true;
      this.registerForm.setValue(editRecord);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      if (this.editMode) {
        // If in edit mode, update the record in the records array
        this.userDataService.updateRecord(formData);
      } else {
        // If not in edit mode, add the record to the records array
        this.userDataService.addRecord(formData);
      }

      // Save the updated records array in sessionStorage
      sessionStorage.setItem(
        'userData',
        JSON.stringify(this.userDataService.getRecords())
      );

      // Reset the form and editMode
      this.registerForm.reset();
      this.editMode = false;
    }
  }
}
