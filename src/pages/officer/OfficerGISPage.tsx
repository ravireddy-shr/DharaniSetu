import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout, PageHeader, PageContent, DemoBanner } from '../../components/layout/PageLayout';
import { GISExplorer } from '../../components/gis/GISExplorer';

export function OfficerGISPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const parcelId = params.get('parcel') || undefined;

  return (
    <PageLayout role="officer">
      <DemoBanner />
      <PageHeader
        title="GIS Land Verification Explorer"
        subtitle="Cross-verify survey numbers, parcel geometries, boundary pegging, and recorded areas"
        breadcrumb={[{ label: 'Home' }, { label: t('nav.gis') }]}
      />
      <PageContent>
        <GISExplorer initialParcelId={parcelId} height="calc(100vh - 220px)" />
      </PageContent>
    </PageLayout>
  );
}
