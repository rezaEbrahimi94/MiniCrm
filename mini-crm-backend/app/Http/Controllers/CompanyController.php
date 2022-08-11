<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyValue;
use App\Models\Company;
use App\Notifications\NewCompanyNotify;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;



class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        $companies = Company::query()->orderBy('id','desc')->paginate(10);

        return $this->sendResponse(200,'companies',$companies);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCompanyRequest $request
     * @return JsonResponse
     */
    public function store(StoreCompanyRequest $request): JsonResponse
    {
        $company = new Company();
        $this->setCompanyFields($company,$request);
        $company->save();
        $email = env('MAIL_SUBSCRIBER');
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            Notification::route('mail' , $email)
                ->notify(new NewCompanyNotify($company));
        }
        return $this->sendResponse(200,'message','Company Added Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @return JsonResponse
     */
    public function show(Company $company): JsonResponse
    {
        return $this->sendResponse(200, 'company',$company);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Company $company
     * @return JsonResponse
     */
    public function edit(Company $company): JsonResponse
    {

        return $this->sendResponse(200,'company',$company);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateCompanyRequest $request
     * @param Company $company
     * @return JsonResponse
     */
    public function update(UpdateCompanyRequest $request, Company $company): JsonResponse
    {
        $this->setCompanyFields($company,$request);
        $company->update();
        return $this->sendResponse(200,'message','Company Updated Successfully');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @return JsonResponse
     */
    public function destroy(Company $company): JsonResponse
    {
        $company->delete();
        return $this->sendResponse(200, 'message', 'Company Deleted Successfully');
    }

    /**
     * Making key values for react-select
     *
     * @return JsonResponse
     */
    public function values(): JsonResponse
    {

        $values = CompanyValue::collection(Company::query()->orderBy('id','desc')->select('id','name')->get());

        return $this->sendResponse(200,'values',$values);

    }

    /**
     * sets Company fields.
     *
     * @param Company $company
     * @param Request $request
     */
    private function setCompanyFields(Company $company,Request $request){

        $company->name = $request->input('name');
        $company->website = $request->input('website');
        $company->email = $request->input('email');
        $logo =$request->file('logo');
        if($logo) {
            $logo=$request->file('logo');
            $filename = time().'.'.$logo->getClientOriginalExtension();
            $logo->move('uploads/', $filename);
            $company->logo = $filename;
        }
    }



}
