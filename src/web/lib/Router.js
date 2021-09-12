import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from 'components/general/Loading';
import { useAppContext } from 'web/lib/AppProvider';

const GeneralInfo = lazy(() =>
	import(
		/* webpackChunkName: "GeneralInfo" */ 'web/modules/generalInfo/GeneralInfo'
	)
);
const User = lazy(() =>
	import(/* webpackChunkName: "User" */ 'web/modules/users/User')
);
const CostOverview = lazy(() =>
	import(
		/* webpackChunkName: "costOverview" */ 'web/modules/costOverview/CostOverview'
	)
);
const CostOverviewYear = lazy(() =>
	import(
		/* webpackChunkName: "costOverviewYear" */ 'web/modules/costOverview/CostOverviewYear'
	)
);
const ListAssessments = lazy(() =>
	import(
		/* webpackChunkName: "listAssessment" */ 'web/modules/assessments/ListAssessments'
	)
);
const CreateAssessment = lazy(() =>
	import(
		/* webpackChunkName: "createAssessment" */ 'web/modules/assessments/CreateAssessment'
	)
);
const ListHousingCooperatives = lazy(() =>
	import(
		/* webpackChunkName: "listHousingCooperative" */ 'web/modules/housingCooperatives/ListHousingCooperatives'
	)
);
const CreateHousingCooperative = lazy(() =>
	import(
		/* webpackChunkName: "createHousingCooperative" */ 'web/modules/housingCooperatives/CreateHousingCooperative'
	)
);
const UpdateHousingCooperative = lazy(() =>
	import(
		/* webpackChunkName: "updateHousingCooperative" */ 'web/modules/housingCooperatives/UpdateHousingCooperative'
	)
);
const Categories = lazy(() =>
	import(
		/* webpackChunkName: "categories" */ 'web/modules/categories/Categories'
	)
);
const ListBuildingData = lazy(() =>
	import(
		/* webpackChunkName: "listBuildingData" */ 'web/modules/buildingData/ListBuildingData'
	)
);
const CreateBuildingData = lazy(() =>
	import(
		/* webpackChunkName: "createBuildingData" */ 'web/modules/buildingData/CreateBuildingData'
	)
);
const UpdateBuildingData = lazy(() =>
	import(
		/* webpackChunkName: "updateBuildingData" */ 'web/modules/buildingData/UpdateBuildingData'
	)
);
const ListHistory = lazy(() =>
	import(
		/* webpackChunkName: "listHistory" */ 'web/modules/history/ListHistory'
	)
);
const ImprovementPlan = lazy(() =>
	import(/* webpackChunkName: "improvementPlan" */ 'web/modules/HomeScreen')
);
const ListUsers = lazy(() =>
	import(/* webpackChunkName: "listUsers" */ 'web/modules/users/ListUsers')
);

const RulesPage = lazy(() =>
	import(
		/* webpackChunkName: "rulesPage" */ 'web/modules/singlepages/RulesPage'
	)
);
const MaintenancePage = lazy(() =>
	import(
		/* webpackChunkName: "maintenancePage" */ 'web/modules/singlepages/MaintenancePage'
	)
);
const HelpPage = lazy(() =>
	import(
		/* webpackChunkName: "helpPage" */ 'web/modules/singlepages/HelpPage'
	)
);
const NewHelpVideoForm = lazy(() =>
	import(
		/* webpackChunkName: "NewhelpPageForms" */ 'web/modules/singlepages/NewVideoForm'
	)
);
const EditHelpVideoForm = lazy(() =>
	import(
		/* webpackChunkName: "EdithelpPageForms" */ 'web/modules/singlepages/EditHelpVideoForm'
	)
);
const FormsPage = lazy(() =>
	import(
		/* webpackChunkName: "formsPage" */ 'web/modules/singlepages/FormsPage'
	)
);
const DutiesPage = lazy(() =>
	import(
		/* webpackChunkName: "dutiesPage" */ 'web/modules/singlepages/DutiesPage'
	)
);
const DealsPage = lazy(() =>
	import(
		/* webpackChunkName: "dealsPage" */ 'web/modules/singlepages/DealsPage'
	)
);
const AllAssessments = lazy(() =>
	import(
		/* webpackChunkName: "printAllAssessments" */ 'web/modules/print/AllAssessments'
	)
);
const ImprovementPlanPrint = lazy(() =>
	import(
		/* webpackChunkName: "printImprovementPlan" */ 'web/modules/print/ImprovementPlan'
	)
);
const SuperSettings = lazy(() =>
	import(
		/* webpackChunkName: "superSettings" */ 'web/modules/admin/SuperSettings'
	)
);

export default function Router() {
	const { isGlobalAdmin, isEditor } = useAppContext();

	return (
		<>
			{isEditor ? (
				<Suspense fallback={<Loading />}>
					<Route
						exact
						path="/kontakter/"
						component={props => <ListUsers {...props} />}
					/>

					<Switch>
						<Route
							exact
							path="/bruker/ny/"
							component={props => <User {...props} />}
						/>
						<Route
							exact
							path="/bruker/:userId/"
							component={props => (
								<User
									userId={props.match.params.userId}
									{...props}
								/>
							)}
						/>
					</Switch>

					<Route
						exact
						path="/tilstandsvurdering/"
						component={props => <ListAssessments {...props} />}
					/>

					<Route
						exact
						path="/tilstandsvurdering/ny/"
						component={props => (
							<CreateAssessment isHistory={false} {...props} />
						)}
					/>
				</Suspense>
			) : (
				<Suspense fallback={<Loading />}>
					<Redirect from="/kontakter/" to="/" />
					<Redirect from="/bruker/" to="/" />
					<Redirect from="/tilstandsvurdering/" to="/" />
				</Suspense>
			)}

			{isGlobalAdmin ? (
				<Suspense fallback={<Loading />}>
					<Route
						exact
						path="/generell-info/"
						component={props => <GeneralInfo {...props} />}
					/>

					<Route
						exact
						path="/boligselskap/"
						component={props => (
							<ListHousingCooperatives {...props} />
						)}
					/>

					<Switch>
						<Route
							exact
							path="/boligselskap/create/"
							component={props => (
								<CreateHousingCooperative {...props} />
							)}
						/>
						<Route
							exact
							path="/boligselskap/:housingCooperativeId/update/"
							component={props => (
								<UpdateHousingCooperative
									housingCooperativeId={
										props.match.params.housingCooperativeId
									}
									{...props}
								/>
							)}
						/>
					</Switch>

					<Route
						exact
						path="/kategorier/"
						component={props => <Categories {...props} />}
					/>

					<Route
						exact
						path="/super-admin/"
						component={props => <SuperSettings {...props} />}
					/>
				</Suspense>
			) : (
				<Suspense fallback={<Loading />}>
					<Redirect from="/generell-info/" to="/" />
					<Redirect from="/boligselskap/" to="/" />
					<Redirect from="/kategorier/" to="/" />
					<Redirect from="/super-admin/" to="/" />
				</Suspense>
			)}

			<Suspense fallback={<Loading />}>
				<Route
					exact
					path="/"
					component={props => <ImprovementPlan {...props} />}
				/>
				<Route
					exact
					path="/hjelp/"
					component={props => <HelpPage {...props} />}
				/>
				<Route
					exact
					path="/hjelp/ny-video"
					component={props => <NewHelpVideoForm {...props} />}
				/>
				<Route
					exact
					path="/hjelp/rediger/:id/"
					component={props => (
						<EditHelpVideoForm
							helpVideoId={props.match.params.id}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/avtaler/"
					component={props => <DealsPage {...props} />}
				/>
				<Route
					exact
					path="/vedlikeholdsplikt/"
					component={props => <DutiesPage {...props} />}
				/>
				<Route
					exact
					path="/skjemaer/"
					component={props => <FormsPage {...props} />}
				/>
				<Route
					exact
					path="/regler/"
					component={props => <RulesPage {...props} />}
				/>
				<Route
					exact
					path="/vedlikehold/"
					component={props => <MaintenancePage {...props} />}
				/>
				<Route
					exact
					path="/kostnadsoversikt/"
					component={props => <CostOverview {...props} />}
				/>
				<Route
					exact
					path="/kostnadsoversikt/:year/"
					component={props => (
						<CostOverviewYear
							{...props}
							year={props.match.params.year}
						/>
					)}
				/>

				<Route
					exact
					path="/historikk/"
					component={props => <ListHistory {...props} />}
				/>
				<Route
					exact
					path="/historikk/ny/"
					component={props => (
						<CreateAssessment isHistory={true} {...props} />
					)}
				/>

				<Route
					exact
					path="/byggningsdata/"
					component={props => <ListBuildingData {...props} />}
				/>

				<Switch>
					<Route
						exact
						path="/byggningsdata/create/"
						component={props => <CreateBuildingData {...props} />}
					/>
					<Route
						exact
						path="/byggningsdata/:buildingDataId/update/"
						component={props => (
							<UpdateBuildingData
								housingCooperativeId={
									props.match.params.housingCooperativeId
								}
								buildingDataId={
									props.match.params.buildingDataId
								}
								{...props}
							/>
						)}
					/>
				</Switch>

				<Route
					exact
					path="/print/vedlikeholdsplan"
					component={props => <ImprovementPlanPrint {...props} />}
				/>

				<Route
					exact
					path="/print/tilstandsvurderinger"
					component={props => <AllAssessments {...props} />}
				/>
			</Suspense>
		</>
	);
}
