import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { ClarityModule } from '@clr/angular';
import { BookComponent } from './book.component';


describe('BookComponent', () => {
    let fixture: ComponentFixture<any>;
    let compiled: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BookComponent
            ],
            imports: [
                ClarityModule.forRoot()
            ]
        });

        fixture = TestBed.createComponent(BookComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement;

    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the book component', async(() => {
        expect(compiled).toBeTruthy();
    }));
});
