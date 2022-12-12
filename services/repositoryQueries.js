// public interface TranslationRepository extends JpaRepository<TranslationEntry, Long>{
	
// 	@Query("SELECT t FROM TranslationEntry t WHERE t.language = :language and t.clusterLabels = :clusterLabel")
// 	List<TranslationEntry> findByLanguageAndClusterLabels(@Param("language") String language,
// 														  @Param("clusterLabel") String clusterLabels);
	
// 	@Query("SELECT t.clusterLabels FROM TranslationEntry t WHERE t.language = :language and t.translated = :translated")
// 	List<String> findClusterByKeyword(@Param("language") String language,
// 								@Param("translated") String keyWord);
	
	
	
// 	List<TranslationEntry> findAll();
// 	Optional<TranslationEntry> findById(Long id);
// }
