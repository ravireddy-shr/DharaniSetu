import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { getParcelsForCitizen } from '../../data/demoData';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { GISExplorer } from '../../components/gis/GISExplorer';

export function GISPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [params] = useSearchParams();
  const requestedParcelId = params.get('parcel') || undefined;

  // Retrieve strictly the parcels belonging to the authenticated citizen
  const citizenParcels = user ? getParcelsForCitizen(user.state, user.name, user.email) : [];

  // Determine initial parcel: preferentially match requested parcel if in citizen's holdings, else first citizen parcel
  const initialParcelId = requestedParcelId && citizenParcels.some(p => p.id === requestedParcelId)
    ? requestedParcelId
    : citizenParcels[0]?.id;

  return (
    <PageLayout role="citizen">
      <DemoBanner />
      <PageHeader
        title={t('gis.title', 'GIS Cadastral Explorer')}
        subtitle={
          citizenParcels.length > 0
            ? `Displaying ${citizenParcels.length} registered land parcel${citizenParcels.length > 1 ? 's' : ''} owned by ${user?.name || 'you'}.`
            : "Interactive cadastral land parcel map. View your registered spatial land boundaries."
        }
        breadcrumb={[{ label: 'Home', path: '/citizen/dashboard' }, { label: t('nav.gis', 'GIS Explorer') }]}
      />
      <PageContent>
        {citizenParcels.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-xs text-slate-500">
            No registered landholdings found for your citizen profile in the GIS registry.
          </div>
        ) : (
          <GISExplorer
            customParcels={citizenParcels}
            initialParcelId={initialParcelId}
            height="calc(100vh - 220px)"
          />
        )}
      </PageContent>
    </PageLayout>
  );
}
