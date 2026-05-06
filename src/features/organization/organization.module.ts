import {Module} from "@nestjs/common";
import {CountriesAdminController} from "@/features/organization/countries/Admin/countries.admin.controller";
import {UpdateCountriesHandler} from "@/features/organization/countries/Admin/commands/update-counries/update-countries.handler";
import {DeleteCountriesHandler} from "@/features/organization/countries/Admin/commands/delete-counries/delete-countries.handler";
import {CreateCountriesHandler} from "@/features/organization/countries/Admin/commands/create-counries/create-countries.handler";
import {BranchesAdminController} from "@/features/organization/branches/Admin/branches.admin.controller";
import {CreateBranchesHandler} from "@/features/organization/branches/Admin/command/create-branches/create-branches.handler";
import {CreateRepresentativesHandler} from "@/features/organization/representatives/Admin/commands/create-representatives/create-representatives.handler";
import {RepresentativesAdminController} from "@/features/organization/representatives/Admin/representatives.admin.controller";
import {RepresentativesPublicController} from "@/features/organization/representatives/Public/representatives.public.controller";
import {GetAllRepresentativesPublicHandler} from "@/features/organization/representatives/Public/queries/get-all-representatives/get-all-representatives.handler";
import {GetOneRepresentativePublicHandler} from "@/features/organization/representatives/Public/queries/get-one-representatives/get-one-representatives.handler";
import {CountriesPublicController} from "@/features/organization/countries/Public/countries.public.controller";
import {GetAllCountriesPublicHandler} from "@/features/organization/countries/Public/queries/get-all-counries/get-all-countries.handler";
import {GetOnePublicCountriesHandler} from "@/features/organization/countries/Public/queries/get-one-counries/get-one-countries.handler";
import {GetOneCountriesHandler} from "@/features/organization/countries/Admin/queries/get-one-counries/get-one-countries.handler";
import {GetAllCountriesHandler} from "@/features/organization/countries/Admin/queries/get-all-counries/get-all-countries.handler";
import {DeleteBranchHandler} from "@/features/organization/branches/Admin/command/delete-branches/delete-branches.handler";
import {GetAllBranchesHandler} from "@/features/organization/branches/Admin/queries/get-all-branches/get-all-branches.handler";
import {UpdateRepresentativeHandler} from "@/features/organization/representatives/Admin/commands/update-representatives/update-representatives.handler";
import {UpdateBranchesHandler} from "@/features/organization/branches/Admin/command/update-branches/update-branches.handler";
import {GetOneBranchHandler} from "@/features/organization/branches/Admin/queries/get-one-branches/get-one-branches.handler";


@Module({

    controllers : [
        CountriesAdminController,
        CountriesPublicController,

        BranchesAdminController,

        RepresentativesAdminController,
        RepresentativesPublicController
    ],

    providers : [
        GetAllCountriesHandler,
        GetOneCountriesHandler,
        UpdateCountriesHandler,
        DeleteCountriesHandler,
        CreateCountriesHandler,


        GetAllCountriesPublicHandler,
        GetOnePublicCountriesHandler,




        CreateBranchesHandler,
        DeleteBranchHandler,
        GetAllBranchesHandler,
        UpdateBranchesHandler,
        GetOneBranchHandler,


        CreateRepresentativesHandler,
        GetAllRepresentativesPublicHandler,
        GetOneRepresentativePublicHandler,
        UpdateRepresentativeHandler

    ]

})

export class OrganizationModule {}