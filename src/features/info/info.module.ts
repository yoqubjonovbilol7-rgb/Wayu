import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StaticInfoAdminController} from "@/features/info/static-info/Admin/static-info.admin.controller";
import {CreateStaticInfoHandler} from "@/features/info/static-info/Admin/command/create-static-info/create-static-info.handler";
import {DeleteStaticInfoHandler} from "@/features/info/static-info/Admin/command/delete-static-info/delete-static.handler";
import {GetAllStaticInfoHandler} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.handler";
import {UpdateStaticInfoHandler} from "@/features/info/static-info/Admin/command/update-static-info/update-static-info.handler";
import {StaticInfoPublicController} from "@/features/info/static-info/Public/static-info.public.controller";
import {GetAllStaticInfoPublicHandler} from "@/features/info/static-info/Public/queries/get-all-static-info/get-all-static-info.handler";
import {GetOneStaticInfoPublicHandler} from "@/features/info/static-info/Public/queries/get-one-static-info/get-one-static-info.handler";
import {CreateSocialLinksHandler} from "@/features/info/social-links/Admin/commands/create-social-links/create-social-links.handler";
import {SocialLinksController} from "@/features/info/social-links/Admin/social-links.admin.controller";
import {DeleteSocialLinksHandler} from "@/features/info/social-links/Admin/commands/delete-social-links/delete-social-links.handler";
import {UpdateSocialLinksHandler} from "@/features/info/social-links/Admin/commands/update-social-links/update-social-links.handler";
import {GetAllSocialLinksHandler} from "@/features/info/social-links/Admin/queries/get-all-social-links/get-all-social-links.handler";
import {SocialLinksPublicController} from "@/features/info/social-links/Public/social-links.public.controller";
import {GetAllSocialLinksPublicHandler} from "@/features/info/social-links/Public/queries/get-all-social-links/get-all-social-links.handler";
import {GetOneSocialLinkPublicHandler} from "@/features/info/social-links/Public/queries/get-one-social-links/get-one-social-links.handler";
import {UsefulLinksController} from "@/features/info/useful-links/Admin/Useful-links.admin.controller";
import {CreateUsefulLinksHandler} from "@/features/info/useful-links/Admin/commands/create-useful-links/create-useful-links.handler";
import {DeleteUsefulLinksHandler} from "@/features/info/useful-links/Admin/commands/delete-useful-links/delete-useful-links.handler";
import {UpdateUsefulLinksHandler} from "@/features/info/useful-links/Admin/commands/update-useful-links/update-useful-links.handler";
import {GetAllUsefulLinksHandler} from "@/features/info/useful-links/Admin/queries/get-all-social-links/get-all-useful-links.handler";
import {UsefulLinksPublicController} from "@/features/info/useful-links/Public/useful-links.public.controller";
import {GetAllUsefulLinksPublicHandler} from "@/features/info/useful-links/Public/queries/get-all-useful-links/get-all-useful-links.handler";
import {GetOneUsefulLinkPublicHandler} from "@/features/info/useful-links/Public/queries/get-one-useful-links/get-one-useful-links.handler";
import {StaticInfo} from "@/features/info/static-info/staticInfo.entity";
import {SocialLinks} from "@/features/info/social-links/socialLinks.entity";
import {UsefulLinks} from "@/features/info/useful-links/usefulLinks.entity";
import {GetOneUsefulLinkHandler} from "@/features/info/useful-links/Admin/queries/get-one-social-links/get-one-useful-links.handler";
import {GetOneSocialLinkHandler} from "@/features/info/social-links/Admin/queries/get-one-social-links/get-one-social-links.handler";
import {GetOneStaticInfoHandler} from "@/features/info/static-info/Admin/queries/get-one-static-info/get-one-static-info.handler";

@Module({
  imports: [TypeOrmModule.forFeature([StaticInfo, SocialLinks, UsefulLinks])],
  controllers : [
    StaticInfoAdminController,
    StaticInfoPublicController,

    SocialLinksController,
    SocialLinksPublicController,

    UsefulLinksController,
    UsefulLinksPublicController
  ],
  providers : [
    CreateStaticInfoHandler,
    DeleteStaticInfoHandler,
    GetAllStaticInfoHandler,
    UpdateStaticInfoHandler,
    GetOneStaticInfoHandler,

    GetAllStaticInfoPublicHandler,
    GetOneStaticInfoPublicHandler,



    CreateSocialLinksHandler,
    DeleteSocialLinksHandler,
    GetOneSocialLinkHandler,
    UpdateSocialLinksHandler,
    GetAllSocialLinksHandler,

    GetAllSocialLinksPublicHandler,
    GetOneSocialLinkPublicHandler,


    CreateUsefulLinksHandler,
    GetOneUsefulLinkHandler,
    DeleteUsefulLinksHandler,
    UpdateUsefulLinksHandler,
    GetAllUsefulLinksHandler,
    GetAllUsefulLinksPublicHandler,
    GetOneUsefulLinkPublicHandler
  ]
})



export class InfoModule {}